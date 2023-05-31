import { Train } from 'src/trains/entities/train.entity';
import { Column, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

export class City {
  @PrimaryColumn()
  id: number;
  @Column()
  name: String;
  @JoinColumn()
  @OneToMany(() => Train, (train) => train.from, { nullable: true })
  departingTrains: Train[];
  @JoinColumn()
  @OneToMany(() => Train, (train) => train.to, { nullable: true })
  arrivingTrains: Train[];
}
