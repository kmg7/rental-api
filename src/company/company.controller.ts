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
  CompanyCreateDto,
  CompanySearchDto,
  CompanyUpdateDto,
} from './dto/company.dto';
import { CompanyService } from './company.service';

@UseGuards(JwtGuard)
@Controller('Companies')
export class CompanyController {
  constructor(private service: CompanyService) {}
  @Get()
  getCompanys(@Query() dto: CompanySearchDto) {
    return this.service.getAll(dto);
  }

  @Post()
  createCompany(@Body() dto: CompanyCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getCompany(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  @Patch(':id')
  updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CompanyUpdateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteCompany(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
