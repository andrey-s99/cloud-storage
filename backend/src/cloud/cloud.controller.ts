import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CloudService } from "./cloud.service";

@Controller("/api/cloud")
export class CloudController {
    constructor(private cloudService: CloudService) {}

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getCloud(@Request() req: any, @Query('path') path: string) {
        return await this.cloudService.getUserFiles(req.user.username, req.user.userId, path);
    }

    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any, @Query('path') path: string) {
        return await this.cloudService.uploadFile(file, req.user.userId, path);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Patch()
    async renameFile(@Request() req: any, @Body('path') path: string, @Body('newName') newName: string)
    {
        return await this.cloudService.renameFile(req.user.userId, path, newName)
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteFile(@Request() req: any, @Query('path') path: string) {
        return await this.cloudService.deleteFile(req.user.userId, path);
    }
}