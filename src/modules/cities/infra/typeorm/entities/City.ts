/* eslint-disable @typescript-eslint/no-unused-vars */
import upload from '@config/upload';
import Deposition from '@modules/depositions/infra/typeorm/entities/Deposition';
import Place from '@modules/places/infra/typeorm/entities/Place';

import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('city')
export default class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @OneToMany(() => Place, place => place.city, { eager: true })
  place: Place[];

  @OneToMany(() => Deposition, deposition => deposition.city, { eager: true })
  depositions: Deposition[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (upload.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `https://${upload.config.aws.bucket}.s3-sa-east-1.amazonaws.com/${this.image}`;
      default:
        return null;
    }
  }
}
