import { Module } from '@nestjs/common';
import { RentOfferService } from './rent-offer.service';
import { RentOfferController } from './rent-offer.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [RentOfferService],
  controllers: [RentOfferController],
})
export class RentOfferModule {}
