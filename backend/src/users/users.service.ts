import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { UserSignInDto } from './dtos/user-sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async createUser(userDto: UserDto): Promise<UserSignInDto> {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        const userEntity = this.usersRepository.create(
            {
                username: userDto.username, 
                password: hashedPassword
            });

        await this.usersRepository.insert(userEntity);

        return new UserSignInDto(userEntity.username, userEntity.id);
    }

    async findOne(username: string): Promise<UserEntity | null> {
        return await this.usersRepository.findOneBy({ username });
    }
}
