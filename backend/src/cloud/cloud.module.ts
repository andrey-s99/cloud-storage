import { Module } from "@nestjs/common";
import { CloudController } from "./cloud.controller";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { CloudService } from "./cloud.service";
import { MinioModule } from "src/minio/minio.module";


@Module({
    controllers: [CloudController],
    imports: [MinioModule],
    providers: [JwtStrategy, CloudService]
  })
export class CloudModule {}