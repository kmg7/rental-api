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
import { RentSearchDto, RentCreateDto, RentUpdateDto } from './dto/rent.dto';
import { RentService } from './rent.service';

@UseGuards(JwtGuard)
@Controller('rents')
export class RentController {
  constructor(private service: RentService) {}
  @Get()
  getRents(@Query() dto: RentSearchDto) {
    return this.service.getAll(dto);
  }

  @Post()
  createRent(@Body() dto: RentCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getRent(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch(':id')
  updateRent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RentUpdateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteRent(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
