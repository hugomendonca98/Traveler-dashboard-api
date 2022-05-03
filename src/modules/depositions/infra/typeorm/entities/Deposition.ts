import upload from '@config/upload';
import City from '@modules/cities/infra/typeorm/entities/City';
import Place from '@modules/places/infra/typeorm/entities/Place';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('deposition')
class Deposition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  avatar: string;

  @Column()
  description: string;

  @Column()
  stars: number;

  @Column()
  moderation_status: string;

  @Exclude()
  @Column()
  city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @Exclude()
  @Column()
  place_id: string;

  @ManyToOne(() => Place)
  @JoinColumn({ name: 'place_id', referencedColumnName: 'id' })
  place: Place;

  @Expose({ name: 'avatar_url' })
  getImageUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (upload.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Deposition;
