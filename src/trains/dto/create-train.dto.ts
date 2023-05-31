import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrainDto {
  @IsNumber()
  @IsNotEmpty()
  fromId: number;
  @IsNumber()
  @IsNotEmpty()
  toId: number;
  @IsString()
  @IsNotEmpty()
  timeOfDeparting: Date;
}
