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
  RentOfferSearchDto,
  RentOfferCreateDto,
  RentOfferUpdateDto,
} from './dto/rent-offer.dto';
import { RentOfferService } from './rent-offer.service';

@UseGuards(JwtGuard)
@Controller('rent-offer')
export class RentOfferController {
  constructor(private service: RentOfferService) {}
  @Get()
  getRentOffers(@Query() dto: RentOfferSearchDto) {
    return this.service.getAll(dto);
  }

  @Post()
  createRentOffer(@Body() dto: RentOfferCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getRentOffer(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch(':id')
  updateRentOffer(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RentOfferUpdateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteRentOffer(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
