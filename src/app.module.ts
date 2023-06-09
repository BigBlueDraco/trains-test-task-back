import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { TrainsModule } from './trains/trains.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      }),
    }),
    TrainsModule,
    CitiesModule,
  ],
})
export class AppModule {}
