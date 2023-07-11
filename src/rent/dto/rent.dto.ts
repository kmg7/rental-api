import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsInt,
  Max,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class RentCreateDto {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  finishDate: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;

  @IsInt()
  @IsNotEmpty()
  offerId: number;

  @IsInt()
  @IsNotEmpty()
  clientId: number;
}

export class RentUpdateDto {
  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  finishDate: string;

  @IsNumber()
  @IsOptional()
  fee: number;

  @IsInt()
  @IsOptional()
  offerId: number;

  @IsInt()
  @IsOptional()
  clientId: number;
}

export class RentSearchDto {
  @MaxLength(50)
  @IsString()
  @IsOptional({})
  query: string;

  @IsIn(['startDate', 'finishDate', 'fee', 'offerId', 'clientId'])
  @IsOptional({})
  field: string;

  @IsIn(['id', 'startDate', 'finishDate', 'fee', 'offerId', 'clientId'])
  @IsOptional()
  sort: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  order: string;

  @IsInt()
  @IsOptional()
  skip: number;

  @IsInt()
  @IsOptional()
  @Max(100)
  take: number;
}
