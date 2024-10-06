import { Injectable } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client, BucketItem } from "minio";

interface GetFilesReturnType {
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

    async uploadFile(file: Express.Multer.File, userId: number, path: string, relativePath: string) {
        const userFolder: string = `user-${userId}-files/${path}`;

        const fileName = relativePath !== "" ? relativePath : file.originalname;

        // Check if the user-files bucket exists
        const isUserFilesExists = await this.minioClient.bucketExists(this.mainBucket);

        // Create user-files bucket if necessary
        if (!isUserFilesExists) {
            await this.minioClient.makeBucket(this.mainBucket);
        }

        // Upload file to user's folder
        await this.minioClient.putObject(
            this.mainBucket, 
            userFolder + `${fileName}`,
            file.buffer,
            file.size,
            {
                'Content-Type': `${file.mimetype}`
            }    
        );
    }

    private async getFilesData(userFolder: string, isRecursive: boolean): Promise<BucketItem[]> {
        const filesData: BucketItem[] = [];

        const filesStream = this.minioClient.listObjects(this.mainBucket, userFolder, isRecursive);

        for await (const fileObj of filesStream) {
            filesData.push(fileObj);
        }

        return filesData;
    }

    async getFiles(username: string, userId: number, path: string) {
        const userFolder: string = `user-${userId}-files/` + path;

        const filesData: BucketItem[] = await this.getFilesData(userFolder, false);

        const result: GetFilesReturnType = {
                        username: username,
                        files: [],
                        folders: []
        };
    
        filesData.forEach(file => {
            if (file?.name) result.files?.push(file.name.split('/').pop() ?? '');
            else if (file?.prefix) result.folders?.push(file.prefix.replace(userFolder, ''));
        });

        return result;
    }

    async searchFiles(userId: number, query: string): Promise<string[]> {
        const userFolder: string = `user-${userId}-files/`

        const filesData: BucketItem[] = await this.getFilesData(userFolder, true);

        const result: string[] = [];

        filesData.forEach(file => {
            if (file?.name) {
                result.push(file.name.replace(userFolder, ''));
            }
        });

        return result.filter((file) => file?.split('/')?.pop()?.search(query) !== -1);
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
            const filesData: BucketItem[] = await this.getFilesData(pathToFile, true);

            // Copy all files in the folder to a folder with the new name
            const files: string[] = filesData.map((fileObj) => fileObj.name ?? '');
            for (const file of files) {
                const fileName = file.split('/').pop();
                await this.minioClient.copyObject(this.mainBucket, pathToNewFolder + fileName, this.mainBucket + '/' + file);
            }
        } else {
            const pathToNewFile: string = pathEdit.join('/') + '/' + newName;
            await this.minioClient.copyObject(this.mainBucket, pathToNewFile, this.mainBucket + '/' + pathToFile);
        }

        // Delete old files
        await this.deleteFile(userId, path);
    }

    async deleteFile(userId: number, path: string) {
        const pathToFile: string = `user-${userId}-files/` + path;

        // Get and delete all files from folder
        if (pathToFile.endsWith('/')) {
            const filesData: BucketItem[] = await this.getFilesData(pathToFile, true);
            const files: string[] = filesData.map((fileObj) => fileObj.name ?? '');
            await this.minioClient.removeObjects(this.mainBucket, files as any);
        } else {
            // Delete single file
            await this.minioClient.removeObject(this.mainBucket, pathToFile);
        }
    }
}