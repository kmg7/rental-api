import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import {
  VehicleCreateDto,
  VehicleSearchDto,
  VehicleUpdateDto,
} from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@UseGuards(JwtGuard)
@Controller('vehicles')
export class VehicleController {
  constructor(private service: VehicleService) {}
  @Get()
  getVehicles(@Query() dto: VehicleSearchDto) {
    return this.service.getAll(dto);
  }

  @Post()
  createVehicle(@Body() dto: VehicleCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch(':id')
  updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VehicleUpdateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
