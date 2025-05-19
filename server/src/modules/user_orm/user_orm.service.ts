import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrmRepository } from './user_orm.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { DataSource, IsNull } from 'typeorm';
import { Employee } from '../onetoone_relation/employee.entity';
import { GalleryEntity } from '../manytoone/Gallery.entity';
import { ImageEntity } from '../manytoone/Image.entity';
import { Student } from '../manytomany/Student.entity';
import { Course } from '../manytomany/Course.entity';
import { CommentEntity } from '../self-reference/Comment.entity';


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

  //one-to-many
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

  //many-to-many
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

  //self-join
  async createDataCommentSelfJoin() {
    const comment = new CommentEntity()
    comment.content = "root-comment"

    //comment level1
    const childComment1Lv1 = new CommentEntity()
    childComment1Lv1.content = "child-comment1-level1"
    const childComment2Lv1 = new CommentEntity()
    childComment2Lv1.content = "child-comment2-level1"

    comment.childrenComment = [childComment1Lv1, childComment2Lv1]
    childComment1Lv1.parentComment = comment
    childComment2Lv1.parentComment = comment

    //comment level2
    const grandChild1 = new CommentEntity()
    const grandChild2 = new CommentEntity()
    grandChild1.content = "grandChild1"
    grandChild2.content = "grandChild2"

    childComment2Lv1.childrenComment = [grandChild1, grandChild2]
    grandChild2.parentComment = childComment2Lv1
    grandChild1.parentComment = childComment1Lv1

  

    const repo = this.dataSource.getRepository(CommentEntity);
    await repo.save(comment); // ID tự sinh ra
    await repo.save([childComment1Lv1, childComment2Lv1]);
    await repo.save([grandChild1, grandChild2]);

    return true;
  }

  async getTreeComment() {
    return  await this.dataSource.getRepository(CommentEntity).findOne({
      where: { parentComment: IsNull() },
      relations: ['children', 'children.children'],
    });
  }

}
