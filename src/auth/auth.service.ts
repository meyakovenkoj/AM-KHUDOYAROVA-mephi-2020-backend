import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from '@app/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    // private mockUser = {
    //     email: 'fff@ff.com',
    //     token: 'jwt.token.here',
    //     username: 'bobik',
    //     password: 'piggydog',
    // };

    constructor (
        @InjectRepository(UserEntity) private userRepo:
        Repository<UserEntity>
    ) {
    }


   async register(credentials: RegistrationDTO) {
       try {
           const user = this.userRepo.create(credentials);
           await user.save();
           return user;
       } catch  (err) {
           if (err.code === '23505') {
               throw new ConflictException('Username has been already taken');
           }
           throw new InternalServerErrorException();
       }
    //    return this.mockUser;
   }

//    async login(credentials: LoginDTO) {
    async login({email, password}: LoginDTO) {
        try {
            const user = await this.userRepo.findOne({where: {email}});
            const isValid = await user.comparePassword(password);
            console.log(isValid)
            if (!isValid) {
                throw new UnauthorizedException("Invalid credentials");
            }
            return user;
        } catch (err) {
            throw new UnauthorizedException("Invalid credentials");
        }
        // if (credentials.email === this.mockUser.email) {
        //     return this.mockUser;
        // }
        // throw new InternalServerErrorException();
   } 
}

