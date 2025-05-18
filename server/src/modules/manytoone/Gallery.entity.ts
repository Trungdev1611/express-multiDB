import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from './Image.entity';

@Entity()
export class GalleryEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string


  @OneToMany(() => ImageEntity, (image) => image.gallery)
  images: ImageEntity[]
}