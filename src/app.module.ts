import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DbModule,
    ClientModule,
    EmployeeModule,
    CompanyModule,
  ],
})
export class AppModule {}
