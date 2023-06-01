import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrainDto } from '../dto/create-train.dto';
import { UpdateTrainDto } from '../dto/update-train.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from '../entities/train.entity';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/service/cities.service';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
    private readonly citiesServices: CitiesService,
  ) {}
  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    try {
      const { fromId, toId } = createTrainDto;
      const from = await this.citiesServices.findOne(fromId);
      const to = await this.citiesServices.findOne(toId);
      if (fromId == toId) {
        throw new Error(
          `The point of departure (fromId: ${fromId}) and the point of arrival (toId: ${toId}) do not have to be the same. `,
        );
      }
      if (!from || !to) {
        const missingCities = [];
        if (!from) missingCities.push(fromId);
        if (!to) missingCities.push(toId);
        throw new Error(
          `Cities with id ${missingCities.join(', ')} not found.`,
        );
      }
      const { timeOfDeparting, ...rest } = createTrainDto;
      const date = new Date(timeOfDeparting);
      const train = await this.trainRepository.save({
        ...rest,
        timeOfDeparting: date,
      });
      return train;
    } catch (err) {
      if (
        err.message.includes('The point of departure') ||
        err.message.includes('Cities')
      ) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
    }
  }

  async findAll(where?: { fromId: number; toId: number }): Promise<Train[]> {
    const trains = await this.trainRepository.find({
      where,
      relations: { from: true, to: true },
    });
    return trains;
  }

  async findOne(id: number): Promise<Train> {
    return await this.trainRepository.findOne({
      where: { id },
      relations: { from: true, to: true },
    });
  }

  async update(id: number, updateTrainDto: UpdateTrainDto): Promise<Train> {
    await this.trainRepository.update(id, updateTrainDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<Train> {
    const train = await this.findOne(id);
    await this.trainRepository.delete(id);
    return train;
  }
}
