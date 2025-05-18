import { Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Entity } from 'typeorm';
import { GalleryEntity } from './Gallery.entity';

@Entity()
export class ImageEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  size: string

  @Column()
  url: string

  @ManyToOne(() => GalleryEntity, (gallery) => gallery.images)
  @JoinColumn()
  gallery: GalleryEntity
}