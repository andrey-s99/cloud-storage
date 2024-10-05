import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CloudService } from "./cloud.service";

@Controller("/api/cloud")
@UseGuards(JwtAuthGuard)
export class CloudController {
    constructor(private cloudService: CloudService) {}

    @HttpCode(200)
    @Get()
    async getCloud(@Request() req: any, @Query('path') path: string) {
        return await this.cloudService.getUserFiles(req.user.username, req.user.userId, path);
    }

    @HttpCode(200)
    @Get('search')
    async searchFiles(@Request() req: any, @Query('query') query: string) {
        return await this.cloudService.searchFiles(req.user.userId, query);
    }

    @HttpCode(201)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any, @Query('path') path: string, @Body('relativePath') relativePath: string) {
        return await this.cloudService.uploadFile(file, req.user.userId, path, relativePath);
    }

    @HttpCode(200)
    @Patch()
    async renameFile(@Request() req: any, @Body('path') path: string, @Body('newName') newName: string)
    {
        return await this.cloudService.renameFile(req.user.userId, path, newName)
    }

    @HttpCode(200)
    @Delete()
    async deleteFile(@Request() req: any, @Query('path') path: string) {
        return await this.cloudService.deleteFile(req.user.userId, path);
    }
}