import { Body, Controller, Post, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from 'src/users/dtos/user.dto';
import { UserSignInDto } from 'src/users/dtos/user-sign-in.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('sign-up')
    async signUp(@Body() userDto: UserDto) {
        return await this.authService.signUp(userDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signIn(@Request() req: any) {
        const userSignInDto = new UserSignInDto(req.user.username, req.user.id);
        return await this.authService.signIn(userSignInDto);
    }
}