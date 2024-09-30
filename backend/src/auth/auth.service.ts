import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dtos/user.dto';
import { UserSignInDto } from 'src/users/dtos/user-sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async signUp(userDto: UserDto) {
    // Sign in user if user already exists
    const user = await this.usersService.findOne(userDto.username);
    

    if (user && !await bcrypt.compare(userDto.password, user.password)) {
      throw new ConflictException('Username is taken.');
    }

    else if (user && await bcrypt.compare(userDto.password, user.password)) {
      return this.signIn(new UserSignInDto(user.username, user.id));
    }

    // Create a new user
    const newUser = await this.usersService.createUser(userDto);

    // Sign in new user
    return this.signIn(newUser);
  }

  async signIn(userSignInDto: UserSignInDto) {
    const payload = { username: userSignInDto.username, sub: userSignInDto.id };
    return {
        accessToken: this.jwtService.sign(payload)
    };
  }
}