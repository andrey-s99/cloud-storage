import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudModule } from './cloud/cloud.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    CloudModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      database: "cloud_storage",
      port: 5433,
      username: "postgres",
      password: "FK96KfaS4tyW",
      synchronize: true,
      logging: false,
      autoLoadEntities: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
