import { Injectable } from "@nestjs/common";
import { MinioService } from "src/minio/minio.service";

@Injectable()
export class CloudService {
    constructor(private minioService: MinioService) {}

    async uploadFile(file: Express.Multer.File, userId: number) {
        // console.log(`
        //     ${file.originalname} 
        //     ${file.mimetype} 
        //     ${file.size} 
        //     ${file.buffer} 
        //     uploaded by user with id ${userId}`
        // );
        this.minioService.uploadFile(file, userId);
        return {};
    }

    // async getUserFiles(userId: number) {

    // }
}