import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EmployeeService } from './employee.service';
import { EmployeeUpdateDto } from './dto/employee.dto';

@UseGuards(JwtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}
  @Get('profile')
  getCurrentEmployee(
    @GetUser() user: { id: number; email: string; name: string },
  ) {
    return user;
  }
  @Patch('profile')
  updateEmployee(
    @Body() dto: EmployeeUpdateDto,
    @GetUser() user: { id: number; email: string; name: string },
  ) {
    return this.service.update(user.id, dto);
  }
}
