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
import { ClientService } from './client.service';
import {
  ClientCreateDto,
  ClientSearchDto,
  ClientUpdateDto,
} from './dto/client.dto';

@UseGuards(JwtGuard)
@Controller('clients')
export class ClientController {
  constructor(private service: ClientService) {}
  @Get()
  getClients(@Query() dto: ClientSearchDto) {
    return this.service.getAll(dto);
  }

  @Post()
  createClient(@Body() dto: ClientCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getClient(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch(':id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ClientUpdateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
