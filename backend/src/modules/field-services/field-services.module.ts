import { Module } from '@nestjs/common';
import { FieldServicesController } from './field-services.controller';
import { FieldServicesService } from './field-services.service';
import { WeatherProvider } from './weather.provider';

@Module({ controllers: [FieldServicesController], providers: [FieldServicesService, WeatherProvider] })
export class FieldServicesModule {}
