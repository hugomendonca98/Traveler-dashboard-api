import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export default class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
