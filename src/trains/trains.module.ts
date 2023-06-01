import { Module } from '@nestjs/common';
import { TrainsService } from './service/trains.service';
import { TrainsController } from './controler/trains.controller';
import { Train } from './entities/train.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Train]), CitiesModule],
  controllers: [TrainsController],
  providers: [TrainsService],
})
export class TrainsModule {}
