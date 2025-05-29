import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DepartmentEntity } from './Department.entity';
import { FilterDepartmentDTO } from './dto/FilterDepartmentDTO';
import * as dayjs from 'dayjs';

// NestJS repository from v0.3+
@Injectable()
export class DepartmentRepo {
  private readonly repository: Repository<DepartmentEntity>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DepartmentEntity);
  }

  async findAll(filter: FilterDepartmentDTO) {
    const querybuilder = this.repository.createQueryBuilder("department")
    if(filter.name) {
        querybuilder.where("department.name ILike :name", {name: `%${filter.name}`})
    }
    if(filter.date) {
      const { date, operation } = filter;
      const formattedDate = dayjs(date).format('DD/MM/YYYY');
      switch (operation) {
        case 'greater':
          querybuilder.andWhere("DATE(department.created_at) > :formattedDate", { formattedDate }); //dùng DATE không so sánh giờ phút giây
          break;
        case 'smaller':
          querybuilder.andWhere("DATE(department.created_at) < :formattedDate", { formattedDate });
          break;
        default:
          // Mặc định là bằng
          querybuilder.andWhere("DATE(department.created_at) = :formattedDate", { formattedDate });
          break;
      }
    }
    const page = filter.page ?? 1
    const pageSize = filter.pageSize ?? 10
    return await querybuilder.skip(page-1).take(pageSize).getManyAndCount();
  }

  async findOne(id: number) {
    return await this.repository
      .createQueryBuilder("department")
      .leftJoin("department.users", "user")
      .leftJoin("user.contract", "contract")
      .select(["department"])
      .addSelect(["user.id", "user.username"])  
      .addSelect(["contract.id", "contract.numberCode", "contract.salaryMonth", "contract.status"])
      .where("department.id = :id", { id })
      .getOne();
  }

    async findOneById(id: number) {
    return this.repository.findOne({
      where: {id: id}
    })
  }
  
}