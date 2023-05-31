import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
    private readonly citiesServices: CitiesService,
  ) {}
  async create(createTrainDto: CreateTrainDto) {
    try {
      const { fromId, toId } = createTrainDto;
      const from = await this.citiesServices.findOne(fromId);
      const to = await this.citiesServices.findOne(toId);
      if (!from || !to) {
        const missingCities = [];
        if (!from) missingCities.push(fromId);
        if (!to) missingCities.push(toId);
        throw new Error(
          `Cities with id ${missingCities.join(', ')} not found.`,
        );
      }
      const train = await this.trainRepository.save(createTrainDto);
      return train;
    } catch (err) {
      if (err.message.includes('Cities')) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
    }
  }

  async findAll() {
    const trains = await this.trainRepository.find({
      relations: { from: true, to: true },
    });
    return trains;
  }

  async findOne(id: number) {
    return await this.trainRepository.findOne({
      where: { id },
      relations: { from: true, to: true },
    });
  }

  async update(id: number, updateTrainDto: UpdateTrainDto) {
    await this.trainRepository.update(id, updateTrainDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const train = await this.findOne(id);
    await this.trainRepository.delete(id);
    return train;
  }
}
