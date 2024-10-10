import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CloudService } from "./cloud.service";
import { Response } from "express";

export interface GetFilesReturnType {
    username?: string;
    files?: string[];
    folders?: string[];
}

@Controller("/api/cloud")
@UseGuards(JwtAuthGuard)
export class CloudController {
    constructor(private cloudService: CloudService) {}

    @HttpCode(200)
    @Get()
    async getCloud(@Req() req: any, @Query('path') path: string): Promise<GetFilesReturnType> {
        return await this.cloudService.getUserFiles(req.user.username, req.user.userId, path);
    }

    @HttpCode(200)
    @Get('search')
    async searchFiles(@Req() req: any, @Query('query') query: string) {
        return await this.cloudService.searchFiles(req.user.userId, query);
    }

    @HttpCode(201)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any, @Query('path') path: string, @Body('relativePath') relativePath: string) {
        // relativePath is used for folder uploads; It is empty for file uploads
        return await this.cloudService.uploadFile(file, req.user.userId, path, relativePath);
    }

    @HttpCode(200)
    @Get('download')
    async downloadFile(@Req() req: any, @Res() res: Response, @Query('path') path: string) {
        // relativePath is used for folder uploads; It is empty for file uploads
        return await this.cloudService.downloadFile(path, req.user.userId, res);
    }

    @HttpCode(200)
    @Patch()
    async renameFile(@Req() req: any, @Body('path') path: string, @Body('newName') newName: string)
    {
        return await this.cloudService.renameFile(req.user.userId, path, newName)
    }

    @HttpCode(200)
    @Delete()
    async deleteFile(@Req() req: any, @Query('path') path: string) {
        return await this.cloudService.deleteFile(req.user.userId, path);
    }
}