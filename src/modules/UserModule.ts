import {Module} from '@nestjs/common';
import {UserService} from '../services/UserService';
import {UserController} from '../controllers/UserController';
import {UserRepository} from "../repositories/UserRepository";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService],
})
export class UserModule {}
