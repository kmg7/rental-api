import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class EmployeeUpdateDto {
  @IsEmail()
  @IsOptional()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;
}
