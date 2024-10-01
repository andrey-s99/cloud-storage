import { Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";
import { PassThrough } from "stream";

@Injectable()
export class MinioService {
    constructor(
        @InjectMinio() private readonly minioClient: Client
    ) {}

    // console.log(`
    //     ${file.originalname} 
    //     ${file.mimetype} 
    //     ${file.size} 
    //     ${file.buffer} 
    //     uploaded by user with id ${userId}`
    // );

    async uploadFile(file: Express.Multer.File, userId: number) {
        const mainBucket: string = "user-files"
        const userFolder: string = `user-${userId}-files/`;

        // Check if the user-files bucket exists
        const isUserFilesExists = await this.minioClient.bucketExists(mainBucket);

        // Create user-files bucket if necessary
        if (!isUserFilesExists) {
            await this.minioClient.makeBucket(mainBucket);
        }

        // Upload file to user's folder
        // TODO: Add custom path support
        await this.minioClient.putObject(
            mainBucket, 
            userFolder + `${file.originalname}`,
            file.buffer,
            file.size,
            {
                'Content-Type': `${file.mimetype}`
            }    
        );
    }
}