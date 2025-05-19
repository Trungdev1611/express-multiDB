import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrmRepository } from './user_orm.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { DataSource } from 'typeorm';
import { Employee } from '../onetoone_relation/employee.entity';
import { GalleryEntity } from '../manytoone/Gallery.entity';
import { ImageEntity } from '../manytoone/Image.entity';
import { Student } from '../manytomany/Student.entity';
import { Course } from '../manytomany/Course.entity';


@Injectable()
export class UserOrmService {
  constructor( private userOrmRepo: UserOrmRepository,
    private dataSource: DataSource
  ) {
   
  }
  create(data: CreateUserDto) {
    return this.userOrmRepo.saveToDB(data)
  }

  findAll() {
    return this.userOrmRepo.findAll();
  }
  async findAllWithItemSoftDelete() {
    return await this.userOrmRepo.findAllWithSoftDelete()
  }

  // findOne(id: number) {
  //   return `This action returns a #id `;
  // }

  async findOneBy(firstname: string, lastname: string) {
    const user = await this.userOrmRepo.findOneBy(firstname, lastname)
    console.log(`usser`, user, firstname, lastname)
    if(!user) {
      return new NotFoundException(`cannot find user`)
    }
    return user
  }

  // update(id: number, updateDto: UpdateDto) {
  //   return `This action updates a #id `;
  // }

  remove(id: number) {
    return this.userOrmRepo.softDeleteOrm(id)
  }

   delete(id: number) {
    return this.userOrmRepo.hardDelete(id)
  }

  //onetoone
  async getEmployeeAndCode() {
    return await this.dataSource
    .getRepository(Employee)
    .createQueryBuilder('employee')
    .leftJoinAndSelect('employee.code_employee', "code_employee")
    .getMany()
  }

  //
  async getGalleryImages() {
    return await this.dataSource
    .getRepository(GalleryEntity)
    .createQueryBuilder('gallery')
    .leftJoinAndSelect('gallery.images', "image")
    .getMany()
  }

  async getImageGallery() {
    return await this.dataSource.getRepository(ImageEntity)
    .createQueryBuilder("image").leftJoinAndSelect("image.gallery", "gallery")
    .getMany()
  }

  async getStudentAndItsCourses() {
    // return await this.dataSource.getRepository(Student)
    //   .find({
    //     relations: {
    //       courses: true
    //     }
    //   })
    return await this.dataSource.getRepository(Student)
    .createQueryBuilder("student")
    .leftJoinAndSelect("student.courses", "course")
    .getMany()
  }
  async getCourseAndItsStudents() {
    // return await this.dataSource.getRepository(Student)
    //   .find({
    //     relations: {
    //       courses: true
    //     }
    //   })
    return await this.dataSource.getRepository(Course)
    .createQueryBuilder("course")
    .leftJoinAndSelect("course.students", "student")
    .getMany()
  }

}
