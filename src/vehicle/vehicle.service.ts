import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PgresService } from 'src/db/db.pgres.service';
import {
  VehicleCreateDto,
  VehicleSearchDto,
  VehicleUpdateDto,
} from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private dbClient: PgresService) {}

  async create(dto: VehicleCreateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query =
      'INSERT INTO Vehicles(class, make, model, transmission, engineType, bodyType) VALUES($1, $2, $3, $4, $5, $6)';
    let params = [];
    for (const key in dto) {
      params.push(dto[key]);
    }

    const result = await this.dbClient.query(query, [
      dto.class,
      dto.make,
      dto.model,
      dto.transmission,
      dto.engineType,
      dto.bodyType,
    ]);

    if (result.success) {
      if (result.meta['count'] != 0) {
        return;
      }
      throw new NotFoundException();
    }
    console.log(result);
    throw new InternalServerErrorException('Something went wrong');
  }

  async get(id: number) {
    const result = await this.dbClient.query(
      'SELECT id, class, make, model, transmission, engineType, bodyType FROM Vehicles WHERE id = $1',
      [id],
    );
    if (result.success) {
      console.log(result);

      if (!result.data[0]) {
        throw new NotFoundException();
      }
      return result.data[0];
    }
    console.log(result);

    throw new InternalServerErrorException('Something went wrong');
  }

  async getAll(dto: VehicleSearchDto) {
    let query =
      'SELECT id, class, make, model, transmission, engineType, bodyType FROM Vehicles ';
    if (dto.query != null) {
      query += `WHERE ${dto.field ?? 'id'} ILIKE '${dto.query}%' `;
    }
    query += `ORDER BY ${dto.sort ?? 'id'} ${(
      dto.order ?? 'ASC'
    ).toUpperCase()} LIMIT ${dto.take ?? 25} OFFSET ${dto.skip ?? 0}`;

    const result = await this.dbClient.query(query);

    if (result.success) {
      return { count: result.data.length, data: result.data };
    }

    console.log(result);

    throw new InternalServerErrorException('Something went wrong');
  }

  async update(id: number, dto: VehicleUpdateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query = 'UPDATE Vehicles SET ';
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
      if (result.meta['count'] != 0) {
        return;
      }
      throw new NotFoundException();
    }
    console.log(result);
    throw new InternalServerErrorException('Something went wrong');
  }

  async remove(id: number) {
    const result = await this.dbClient.query(
      'DELETE FROM Vehicles WHERE id = $1',
      [id],
    );
    if (result.success) {
      if (result.meta['count'] != 0) {
        return;
      }
      throw new NotFoundException();
    }
    console.log(result);

    throw new InternalServerErrorException('Something went wrong');
  }
}
