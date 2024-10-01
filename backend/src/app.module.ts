import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudModule } from './cloud/cloud.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UsersModule,
    CloudModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST as string,
      database: process.env.POSTGRES_DB as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
      username: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      synchronize: true,
      logging: false,
      autoLoadEntities: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
