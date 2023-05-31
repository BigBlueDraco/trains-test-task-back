import { Train } from 'src/trains/entities/train.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class City {
  @JoinColumn()
  @ManyToOne(() => Train, (train) => train.from)
  departingTrains: Train;
  @JoinColumn()
  @ManyToOne(() => Train, (train) => train.to)
  arrivingTrains: Train;
}
