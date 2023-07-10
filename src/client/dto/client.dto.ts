import {
  IsCreditCard,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
  IsInt,
  Max,
  MaxLength,
  IsArray,
} from 'class-validator';

export class ClientCreateDto {
  @IsString()
  @IsNotEmpty()
  ssn: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsNotEmpty()
  password: ArrayBuffer;

  @IsString()
  @IsNotEmpty()
  creditcard: string;
}

export class ClientUpdateDto {
  @IsString()
  @IsOptional()
  ssn: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  creditcard: string;
}

export class ClientSearchDto {
  @MaxLength(50)
  @IsString()
  @IsOptional({})
  query: string;

  @IsIn(['ssn', 'name', 'email'])
  @IsOptional({})
  field: string;

  @IsIn(['id', 'ssn', 'name', 'email'])
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
