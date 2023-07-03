import { Module } from '@nestjs/common';
import { PgresService } from './db.pgres.service';

@Module({
  providers: [PgresService],
  exports: [PgresService],
})
export class DbModule {}
