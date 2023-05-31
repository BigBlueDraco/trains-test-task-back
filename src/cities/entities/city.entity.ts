import { Train } from 'src/trains/entities/train.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @JoinColumn()
  @OneToMany(() => Train, (train) => train.from, { nullable: true })
  departingTrains: Train[];
  @JoinColumn()
  @OneToMany(() => Train, (train) => train.to, { nullable: true })
  arrivingTrains: Train[];
}
