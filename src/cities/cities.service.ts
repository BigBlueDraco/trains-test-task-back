import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  async create(createCityDto: CreateCityDto) {
    const city = await this.cityRepository.save(createCityDto);
    return city;
  }

  async findAll() {
    const cities = await this.cityRepository.find({
      relations: { departingTrains: true, arrivingTrains: true },
    });
    return cities;
  }

  async findOne(id: number) {
    return await this.cityRepository.findOne({
      where: { id },
      relations: { departingTrains: true, arrivingTrains: true },
    });
  }

  async findByName(name: string): Promise<City[]> {
    return await this.cityRepository.find({
      where: { name },
      relations: { departingTrains: true, arrivingTrains: true },
    });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    await this.cityRepository.update(id, updateCityDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    await this.cityRepository.delete(id);
    return city;
  }
}
