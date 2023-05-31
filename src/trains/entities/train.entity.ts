import { City } from 'src/cities/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trains')
export class Train {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;

  @Column()
  fromId: number;
  @JoinColumn()
  @ManyToOne(() => City, (city) => city.departingTrains, {
    onDelete: 'CASCADE',
  })
  from: City;

  @Column()
  toId: number;
  @JoinColumn()
  @ManyToOne(() => City, (city) => city.arrivingTrains, { onDelete: 'CASCADE' })
  to: City;
  @Column()
  timeOfDeparting: Date;
}
