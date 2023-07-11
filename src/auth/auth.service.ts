import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import * as argon from 'argon2';
import { PgresService } from 'src/db/db.pgres.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private dbClient: PgresService,
  ) {}

  async register(dto: AuthRegisterDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new employee in the db
    const uniqueResult = await this.dbClient.query(
      `SELECT * FROM Employees WHERE Employees.email= '${dto.email}'`,
    );

    if (uniqueResult.success && uniqueResult.data.length !== 0) {
      throw new BadRequestException('Registered Email');
    }

    const insertResult = await this.dbClient.query(
      'INSERT INTO Employees(name, email, password) VALUES($1, $2, $3)',
      [dto.name, dto.email, hash],
    );

    if (!insertResult.success) {
      console.log(insertResult);
      throw new InternalServerErrorException();
    }
    return this.signToken(insertResult.data['id'], insertResult.data['email']);
  }

  async login(dto: AuthLoginDto) {
    // find the employee by email
    const result = await this.dbClient.query(
      `SELECT * FROM Employees WHERE Employees.email= '${dto.email}'`,
    );

    if (!result.success) {
      throw new InternalServerErrorException();
    }

    // if employee does not exist throw exception
    if (result.data.length === 0) {
      throw new BadRequestException('Credentials incorrect');
    }
    // compare password
    const pwMatches = await argon.verify(
      Buffer.from(result.data[0]['password']).toString(),
      dto.password,
    );

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(result.data[0]['id'], dto.email);
  }

  async signToken(
    employeeId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: employeeId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '3h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
