import { Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client, BucketItem } from "minio";

interface ReturnType {
    username?: string;
    files?: string[];
    folders?: string[];
}

@Injectable()
export class MinioService {
    private mainBucket: string = `user-files`
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

    async uploadFile(file: Express.Multer.File, userId: number, path: string) {
        const userFolder: string = `user-${userId}-files/${path}`;

        // Check if the user-files bucket exists
        const isUserFilesExists = await this.minioClient.bucketExists(this.mainBucket);

        // Create user-files bucket if necessary
        if (!isUserFilesExists) {
            await this.minioClient.makeBucket(this.mainBucket);
        }

        // Upload file to user's folder
        await this.minioClient.putObject(
            this.mainBucket, 
            userFolder + `${file.originalname}`,
            file.buffer,
            file.size,
            {
                'Content-Type': `${file.mimetype}`
            }    
        );
    }

    async getFiles(username: string, userId: number, path: string) {
        const userFolder: string = `user-${userId}-files/` + path;

        const filesData: BucketItem[] = [];

        return new Promise((resolve, reject) => {
            const filesStream = this.minioClient.listObjects(this.mainBucket, userFolder, false);

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
                    if (file?.name) result.files?.push(file.name.split('/').pop() ?? '');
                    else if (file?.prefix) result.folders?.push(file.prefix.replace(userFolder, ''));
                });

                resolve(result);
            });

            filesStream.on(`error`, (err) => {
                reject(err);
            })
        })
    }

    async searchFiles(userId: number, query: string) {
        const userFolder: string = `user-${userId}-files/`

        const result: string[] = await new Promise((resolve, reject) => {
            const filesStream = this.minioClient.listObjects(this.mainBucket, userFolder, true);
            const filesData: BucketItem[] = [];

            filesStream.on('data', (fileObj) => {
                filesData.push(fileObj);
            })
    
            filesStream.on('end', () => {
                const result: string[] = [];

                filesData.forEach(file => {
                    if (file?.name) result.push(file.name.replace(userFolder, ''));
                });

                resolve(result);
            });

            filesStream.on(`error`, (err) => {
                reject(err);
            })
        })

        return result.filter((file) => file.search(query) !== -1)
    }

    async renameFile(userId: number, path: string, newName: string) {
        const pathToFile: string = `user-${userId}-files/` + path;
        const pathEdit = pathToFile.split('/');
        pathEdit.pop();

        // Copy file with the new name
        if (pathToFile.endsWith('/')) {
            // Pop the old folder name
            pathEdit.pop();
            const pathToNewFolder: string = pathEdit.join('/') + '/' + newName + '/';

            // Copy all files in the folder to a folder with the new name
            const files: string[] = await new Promise((resolve, reject) => {
                const filesStream = this.minioClient.listObjects(this.mainBucket, pathToFile, true);
                const filesData: string[] = [];

                filesStream.on('data', (fileObj) => {
                    filesData.push(fileObj?.name ?? '');
                })
        
                filesStream.on('end', () => {
                    resolve(filesData);
                });

                filesStream.on(`error`, (err) => {
                    reject(err);
                })
            });

            for (const file of files) {
                const fileName = file.split('/').pop();

                await this.minioClient.copyObject(this.mainBucket, pathToNewFolder + fileName, this.mainBucket + '/' + file);
            }

        } else {
            const pathToNewFile: string = pathEdit.join('/') + '/' + newName;

            await this.minioClient.copyObject(this.mainBucket, pathToNewFile, this.mainBucket + '/' + pathToFile);
        }


        // Delete old file
        await this.deleteFile(userId, path);
    }

    async deleteFile(userId: number, path: string) {
        const pathToFile: string = `user-${userId}-files/` + path;

        // Get and delete all files from folder
        if (pathToFile.endsWith('/')) {
            const files = await new Promise((resolve, reject) => {
                const filesStream = this.minioClient.listObjects(this.mainBucket, pathToFile, true);
                const filesData: string[] = [];

                filesStream.on('data', (fileObj) => {
                    filesData.push(fileObj?.name ?? '');
                })
        
                filesStream.on('end', () => {
                    resolve(filesData);
                });

                filesStream.on(`error`, (err) => {
                    reject(err);
                })
            });

            await this.minioClient.removeObjects(this.mainBucket, files as any);
        } else {
            // Delete single file
            await this.minioClient.removeObject(this.mainBucket, pathToFile);
        }

        return;
    }
}