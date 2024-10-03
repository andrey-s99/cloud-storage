import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MinioService } from "src/minio/minio.service";

@Injectable()
export class CloudService {
    constructor(private minioService: MinioService) {}

    async uploadFile(file: Express.Multer.File, userId: number, path: string) {
        try {
            return await this.minioService.uploadFile(file, userId, path);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async getUserFiles(username: string, userId: number, path: string) {
        try {
            return await this.minioService.getFiles(username, userId, path);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async deleteFile(userId: number, path: string) {
        try {
            return await this.minioService.deleteFile(userId, path);
        } catch(err) {
            throw new InternalServerErrorException();
        }
    }
}