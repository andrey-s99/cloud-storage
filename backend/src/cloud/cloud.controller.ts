import { Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("/api/cloud")
export class CloudController {
    // constructor(private cloudService: CloudService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getCloud() {

    }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
        console.log(file, req.user.username, req.user.userId);
    }
}