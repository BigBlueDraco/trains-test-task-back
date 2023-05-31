import { Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { Train } from './entities/train.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Train]), CitiesModule],
  controllers: [TrainsController],
  providers: [TrainsService],
})
export class TrainsModule {}
