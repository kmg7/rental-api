import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PgresService } from 'src/db/db.pgres.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private dbClient: PgresService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const result = await this.dbClient.query(
      'SELECT id, name, email FROM Employees WHERE Employees.id=$1',
      [payload.sub],
    );
    if (!result.success) {
      throw new InternalServerErrorException();
    }

    return result.data[0];
  }
}
