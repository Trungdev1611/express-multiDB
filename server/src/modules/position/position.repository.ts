import { PositionEntity } from './Position.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SearchPositionDTO } from './dto/SearchPosition.dto';

// NestJS repository from v0.3+
@Injectable()
export class PositionRepoSitory {
  private readonly repository: Repository<PositionEntity>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(PositionEntity);
  }

  async findAll(searchPositionDTO: SearchPositionDTO): Promise<[PositionEntity[], number]> {
    // return await this.repository.createQueryBuilder("position")
    // .leftJoin("position.users", "user")
    // // .select("position.id", "position_id")
    // // .select(["user.id, user.username, user.email, position.id"])
    // .select("position.id", "position_id")
    // // .addSelect("user.username","username")
    // // .addSelect("user.email", "user_email")
    // // .addSelect("user.id", "user_id")
    // // .addSelect(["user.name", "user.email", "user.id"])
    // .addSelect("COUNT(user.id)", "user_count")
    // .groupBy("position.id")
    // // .addGroupBy("user.username")
    // // .addGroupBy("user.email")
    // // .addGroupBy("user.id")
    // .getRawMany();

    const query = this.repository.createQueryBuilder("position")
      .loadRelationCountAndMap("position.userCount", "position.users") //tính count - hoặc sử dụng groupby với sql thuần cũng được

    if (searchPositionDTO?.name) {
      query.where("position.name ILike :name", { name: `%${searchPositionDTO.name}` })
    }
    return await query
      .skip((searchPositionDTO.page - 1) * searchPositionDTO.pageSize)
      .take(searchPositionDTO.pageSize)
      .getManyAndCount()
  }

  async findDetailWithUsers(idUser: number): Promise<any> {
    //lấy detail position with list its user belong

    //sử dụng rawQuery:C1
    // const rawQuery = this.repository.query(`
    //   SELECT p.id AS position_id, p.name AS position_name,
    //   json_agg(
    //   json_build_object( 
    //   'id_user', u.id,
    //   'email_user', u.email,
    //   'name_user', u.username
    //   )) AS users
    //   FROM position_entity p LEFT JOIN users u ON p.id = u."positionId"
    //   WHERE p.id = $1
    //   GROUP BY p.id, p.name
    //   `, [idUser])
    // return await rawQuery

    //sử dụng TypeOrm - hỗ trợ list users trong 1 position luôn
    const queryBuilder = this.repository.createQueryBuilder("position")
    .leftJoin("position.users", "user")
    .select(["position.id", "position.name", "user.id", "user.username", "user.email"])
    .where("position.id = :idUser", {idUser})
    .getOne()

    return await queryBuilder
  }
}