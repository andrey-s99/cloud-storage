import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MinioService } from "src/minio/minio.service";

@Injectable()
export class CloudService {
    constructor(private minioService: MinioService) {}

    async uploadFile(file: Express.Multer.File, userId: number) {
        try {
            return await this.minioService.uploadFile(file, userId);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async getUserFiles(username: string, userId: number) {
        try {
            return await this.minioService.getFiles(username, userId);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}