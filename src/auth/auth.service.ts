import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUser, RegisterUser } from './dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('AuthService');
    jwtService: any;

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Database connected');
    }

    async login(dto: LoginUser) {

        const { email, password } = dto;
        try {
            const user = await this.user.findUnique({
                where: { email }
            });
            if (!user) {
                throw new RpcException({
                    status: 404,
                    message: 'User not found'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new RpcException({
                    status: 401,
                    message: 'Invalid credentials'
                });
            }

            const { password: _, ...rest } = user;

            return {
                user: rest,
                token: await this.signJWT(rest),
            };

        } catch (error) {
            this.logger.error('Error logging in user', error);
            throw error;

        }
    }


    async register(dto: RegisterUser) {
        const { email, username, password } = dto;

        try {
            const user = await this.user.findUnique({
                where: { email }
            });

            if (user) {
                throw new RpcException({
                    status: 409,
                    message: 'User already exists'
                });
            }

            const hashPassword = await bcrypt.hash(password, 15);

            const newUser = await this.user.create({
                data: {
                    email: email,
                    name: username,
                    password: hashPassword
                }
            });

            const { password: _, ...rest } = newUser;

            return {
                user: rest,
                token: await this.signJWT(rest),
            };

        } catch (error) {
            this.logger.error('Error registering user', error);
            throw error;

        }
    }

    async signJWT(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string) {
        try {

            const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
                secret: envs.jwt_secret,
            });

            return {
                user: user,
                token: await this.signJWT(user),
            }

        } catch (error) {
            console.log(error);
            throw new RpcException({
                status: 401,
                message: 'Invalid token'
            })
        }

    }


}
