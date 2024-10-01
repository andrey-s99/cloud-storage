import { Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client, BucketItem } from "minio";

interface ReturnType {
    username: string;
    files?: string[];
    folders?: string[];
}

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

    async getFiles(username: string, userId: number) {
        console.log(`Getting files for ${username}`);
        
        const mainBucket: string = "user-files"
        const userFolder: string = `user-${userId}-files/`;

        const filesData: BucketItem[] = [];

        return new Promise((resolve, reject) => {
            const filesStream = this.minioClient.listObjects(mainBucket, userFolder, false);

            filesStream.on('data', (fileObj) => {
                filesData.push(fileObj);
            })
    
            filesStream.on('end', () => {
                const result: ReturnType = {
                    username: username,
                    files: [],
                    folders: []
                };

                filesData.forEach(file => {
                    if (file?.name) result.files?.push(file.name.replace(userFolder, ''));
                    else if (file?.prefix) result.folders?.push(file.prefix.replace(userFolder, ''));
                });

                resolve(result);
            });

            filesStream.on(`error`, (err) => {
                reject(err);
            })
        })
    }
}