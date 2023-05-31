import { City } from 'src/cities/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('trains')
export class Train {
  @PrimaryColumn()
  id: number;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @JoinColumn()
  @ManyToOne(() => City, (city) => city.departingTrains)
  from: City;
  @JoinColumn()
  @ManyToOne(() => City, (city) => city.arrivingTrains)
  to: City;
  @Column()
  timeOfDispath: Date;
}
