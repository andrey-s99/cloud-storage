import { Module } from "@nestjs/common";
import { CloudController } from "./cloud.controller";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";


@Module({
    controllers: [CloudController],
    providers: [JwtStrategy]
  })
export class CloudModule {}