import { Controller, Get, HttpCode, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CloudService } from "./cloud.service";

@Controller("/api/cloud")
export class CloudController {
    constructor(private cloudService: CloudService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getCloud(@Request() req: any) {
        return await this.cloudService.getUserFiles(req.user.username, req.user.userId);
    }

    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        return await this.cloudService.uploadFile(file, req.user.userId);
    }
}