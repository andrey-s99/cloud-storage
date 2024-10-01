import { Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";

@Injectable()
export class MinioService {
    constructor(@InjectMinio() private readonly minioClient: Client) {}

    async uploadFile(file: Express.Multer.File, userId: number) {
        // Check if the user-files bucket exists
        const isUserFilesExists = await this.minioClient.bucketExists("user-files");
        // Create user-files bucket if necessary
        if (!isUserFilesExists) {
            await this.minioClient.makeBucket("user-files");
        }

        // List all buckets
        const buckets = await this.minioClient.listBuckets();
        console.log(`Bucket list: \n${buckets}`);

        return;
    }
}