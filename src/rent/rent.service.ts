import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PgresService } from 'src/db/db.pgres.service';
import { RentCreateDto, RentSearchDto, RentUpdateDto } from './dto/rent.dto';

@Injectable()
export class RentService {
  constructor(private dbClient: PgresService) {}

  async create(dto: RentCreateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query =
      'INSERT INTO Rents(startDate, finishDate, fee, offerId, clientId) VALUES($1, $2, $3, $4, $5)';

    const result = await this.dbClient.query(query, [
      dto.startDate,
      dto.finishDate,
      dto.fee,
      dto.offerId,
      dto.clientId,
    ]);

    if (result.success) {
      if (result.meta['count'] != 0) {
        return;
      }
      throw new NotFoundException();
    }
    throw new InternalServerErrorException('Something went wrong');
  }

  async get(id: number) {
    const result = await this.dbClient.query(
      'SELECT id, startDate, finishDate, fee, offerId, clientId FROM Rents WHERE id = $1',
      [id],
    );
    if (result.success) {
      if (!result.data[0]) {
        throw new NotFoundException();
      }
      return result.data[0];
    }
    console.log(result);

    throw new InternalServerErrorException('Something went wrong');
  }

  async getAll(dto: RentSearchDto) {
    let query =
      'SELECT id, startDate, finishDate, fee, offerId, clientId FROM Rents ';
    if (dto.query != null && dto.field != null) {
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

  async update(id: number, dto: RentUpdateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query = 'UPDATE Rents SET ';
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
      'DELETE FROM Rents WHERE id = $1',
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
