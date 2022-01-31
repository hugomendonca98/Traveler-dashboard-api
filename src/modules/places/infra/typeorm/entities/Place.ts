import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('place')
export default class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  category_id: string;

  // eagler é para trazer as relações, cascade se tiver ralação dentro da relação.
  @ManyToOne(() => Category, { eager: true, cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  @Exclude()
  address_id: string;

  @ManyToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
