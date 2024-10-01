import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserSignInDto } from "src/users/dtos/user-sign-in.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super();
    }

    async validate(_username: string, password: string): Promise<any> {
        const username = _username.toLowerCase()
        const user = await this.usersService.findOne(username);
    
        if (!user) {
            throw new UnauthorizedException('Incorrect username.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Incorrect password.');
        }
        
        return { username: user.username, id: user.id };
    }
}