import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MinioService } from "src/minio/minio.service";
import { GetFilesReturnType } from "./cloud.controller";
import { Response } from "express";

@Injectable()
export class CloudService {
    constructor(private minioService: MinioService) {}

    async uploadFile(file: Express.Multer.File, userId: number, path: string, relativePath: string) {
        try {
            return await this.minioService.uploadFile(file, userId, path, relativePath);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async downloadFile(path: string, userId: number, res: Response) {
        try {
            return await this.minioService.downloadFile(path, userId, res);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async getUserFiles(username: string, userId: number, path: string): Promise<GetFilesReturnType> {
        try {
            return await this.minioService.getFiles(username, userId, path);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async searchFiles(userId: number, query: string) {
        try {
            return await this.minioService.searchFiles(userId, query);
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async renameFile(userId: number, path: string, newName: string) {
        try {
            return await this.minioService.renameFile(userId, path, newName);
        } catch(err) {
            console.log(err);
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