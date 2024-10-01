import { Module } from "@nestjs/common";
import { CloudController } from "./cloud.controller";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { CloudService } from "./cloud.service";


@Module({
    controllers: [CloudController],
    providers: [JwtStrategy, CloudService]
  })
export class CloudModule {}