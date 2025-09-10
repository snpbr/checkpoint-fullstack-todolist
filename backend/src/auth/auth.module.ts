// import { Module } from '@nestjs/common';

// @Module({})
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // On importe le UsersModule pour pouvoir utiliser le UsersService
    UsersModule,
    // On importe PassportModule pour gérer les stratégies d'authentification
    PassportModule,
    // On importe et configure JwtModule pour la gestion des tokens JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // On récupère la clé secrète depuis les variables d'environnement
        secret: configService.get<string>('JWT_SECRET'),
        // On définit la durée de validité du token (ici, 1 heure)
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  // Le controller gérera les routes /auth/login et /auth/register
  controllers: [AuthController],
  // Le service contiendra la logique, et la JwtStrategy validera les tokens
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
