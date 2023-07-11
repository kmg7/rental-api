import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PgresService } from 'src/db/db.pgres.service';
import {
  RentOfferCreateDto,
  RentOfferSearchDto,
  RentOfferUpdateDto,
} from './dto/rent-offer.dto';

@Injectable()
export class RentOfferService {
  constructor(private dbClient: PgresService) {}

  async create(dto: RentOfferCreateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query =
      'INSERT INTO RentOffers(pricePerDay, currency, deposit, minDriverAge, minDriverLicenceAge, vehicleId, companyId) VALUES($1, $2, $3, $4, $5, $6, $7)';

    const result = await this.dbClient.query(query, [
      dto.pricePerDay,
      dto.currency,
      dto.deposit,
      dto.minDriverAge,
      dto.minDriverLicenceAge,
      dto.vehicleId,
      dto.companyId,
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
      'SELECT id, pricePerDay, currency, deposit, minDriverAge, minDriverLicenceAge, vehicleId, companyId FROM RentOffers WHERE id = $1',
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

  async getAll(dto: RentOfferSearchDto) {
    let query =
      'SELECT id, pricePerDay, currency, deposit, minDriverAge, minDriverLicenceAge, vehicleId, companyId FROM RentOffers ';
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

  async update(id: number, dto: RentOfferUpdateDto) {
    const l = Object.keys(dto).length;

    if (l === 0) {
      throw new BadRequestException('Body must contain data');
    }
    let query = 'UPDATE RentOffers SET ';
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
      'DELETE FROM RentOffers WHERE id = $1',
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
