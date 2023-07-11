import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CompanyCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class CompanyUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}

export class CompanySearchDto {
  @MaxLength(50)
  @IsString()
  @IsOptional({})
  query: string;

  @IsIn(['name', 'phone'])
  @IsOptional({})
  field: string;

  @IsIn(['id', 'name', 'phone'])
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
