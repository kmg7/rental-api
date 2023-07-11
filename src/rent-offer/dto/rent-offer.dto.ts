import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsInt,
  Max,
  MaxLength,
  IsDecimal,
  IsNumber,
} from 'class-validator';

export class RentOfferCreateDto {
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @IsString()
  @MaxLength(3)
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsNotEmpty()
  deposit: number;

  @IsInt()
  @IsNotEmpty()
  minDriverAge: number;

  @IsInt()
  @IsNotEmpty()
  minDriverLicenceAge: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsInt()
  @IsNotEmpty()
  companyId: number;
}

export class RentOfferUpdateDto {
  @IsDecimal()
  @IsOptional()
  pricePerDay: number;

  @IsString()
  @MaxLength(3)
  @IsOptional()
  currency: string;

  @IsDecimal()
  @IsOptional()
  deposit: number;

  @IsInt()
  @IsOptional()
  minDriverAge: number;

  @IsInt()
  @IsOptional()
  minDriverLicenceAge: number;

  @IsInt()
  @IsOptional()
  vehicleId: number;

  @IsInt()
  @IsOptional()
  companyId: number;
}

export class RentOfferSearchDto {
  @MaxLength(50)
  @IsString()
  @IsOptional({})
  query: string;

  @IsIn([
    'pricePerDay',
    'currency',
    'deposit',
    'minDriverAge',
    'minDriverLicenceAge',
    'vehicleId',
    'companyId',
  ])
  @IsOptional({})
  field: string;

  @IsIn([
    'id',
    'pricePerDay',
    'currency',
    'deposit',
    'minDriverAge',
    'minDriverLicenceAge',
    'vehicleId',
    'companyId',
  ])
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
