/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import City from '@modules/cities/infra/typeorm/entities/City';
import upload from '@config/upload';
import Deposition from '@modules/depositions/infra/typeorm/entities/Deposition';

@Entity('place')
export default class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  image: string;

  @Expose({ name: 'place_image' })
  getImageUrl(): string | null {
    if (!this.image) {
      return null;
    }

    switch (upload.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      case 's3':
        return `${process.env.APP_API_URL}/files/${this.image}`;
      default:
        return null;
    }
  }

  @Column()
  description: string;

  @Column()
  total_depositions_stars: number;

  @Column()
  number_depositions: number;

  @Exclude()
  @Column()
  city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @Column()
  @Exclude()
  category_id: string;

  // eagler é para trazer as relações, cascade se tiver ralação dentro da relação.
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  @Exclude()
  address_id: string;

  @ManyToOne(() => Address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany(() => Deposition, deposition => deposition.place)
  depositions: Deposition[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
