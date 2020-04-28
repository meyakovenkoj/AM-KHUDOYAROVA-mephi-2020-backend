import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { UserEntity } from "@app/user/entity/user.entity";
import { Repository } from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import { AuthPayload } from "@app/models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity) private userRepo: 
        Repository<UserEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretorKey: process.env.SECRET,
        });
    }

    async validates(payload: AuthPayload) {
        const {username} = payload;
        const user = this.userRepo.find({where:{username}});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}