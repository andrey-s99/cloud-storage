import { Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/api/cloud")
export class CloudController {
    // constructor(private cloudService: CloudService) {}

    // TODO: Add JWT token verification
    @UseGuards()
    @Get('')
    async getCloud() {

    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
}