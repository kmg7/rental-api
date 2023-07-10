import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PgresService } from 'src/db/db.pgres.service';
import { EmployeeUpdateDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private dbClient: PgresService) {}

  async update(id: number, dto: EmployeeUpdateDto) {
    console.log(dto);
    const l = Object.keys(dto).length;

    console.log();
    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    if (dto.email) {
      const uniqueResult = await this.dbClient.query(
        `SELECT * FROM Employees WHERE Employees.email= '${dto.email}'`,
      );

      if (uniqueResult.success && uniqueResult.data.length !== 0) {
        if (uniqueResult.data[0]['id'] !== id) {
          throw new BadRequestException('Registered Email');
        }
      }
    }
    let query = 'UPDATE Employees SET ';
    let params = [];
    let i = 1;
    for (const key in dto) {
      query += `${key} = $${i}`;
      params.push(dto[key]);
      if (l !== i) {
        query += ', ';
      }
      i++;
    }
    params.push(id);
    query += ` WHERE id = $${i}`;

    const result = await this.dbClient.query(query, params);
    if (result.success) {
      return 200;
    }
    console.log(result);
    throw new InternalServerErrorException('Something went wrong');
  }
}
