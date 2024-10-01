import { Module } from "@nestjs/common";
import { NestMinioModule } from "nestjs-minio";
import { MinioService } from "./minio.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        NestMinioModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                endPoint: configService.get<string>('MINIO_HOST') ?? 'localhost',
                port: 9000,
                useSSL: false,
                accessKey: configService.get<string>('MINIO_ROOT_USER') ?? '',
                secretKey: configService.get<string>('MINIO_ROOT_PASSWORD') ?? '',
                isGlobal: true,
            }),
        }),
    ],
    exports: [MinioService],
    providers: [MinioService]
})
export class MinioModule {}