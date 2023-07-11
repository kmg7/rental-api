import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsInt,
  Max,
  MaxLength,
} from 'class-validator';

export class VehicleCreateDto {
  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  make: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsString()
  @IsNotEmpty()
  engineType: string;

  @IsString()
  @IsNotEmpty()
  bodyType: string;
}

export class VehicleUpdateDto {
  @IsString()
  @IsOptional()
  class: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  make: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  transmission: string;

  @IsString()
  @IsOptional()
  engineType: string;

  @IsString()
  @IsOptional()
  bodyType: string;
}

export class VehicleSearchDto {
  @MaxLength(50)
  @IsString()
  @IsOptional({})
  query: string;

  @IsIn(['class', 'make', 'model', 'transmission', 'engineType', 'bodyType'])
  @IsOptional({})
  field: string;

  @IsIn([
    'id',
    'class',
    'make',
    'model',
    'transmission',
    'engineType',
    'bodyType',
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
