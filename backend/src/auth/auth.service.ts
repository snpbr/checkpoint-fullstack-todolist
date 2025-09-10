import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Logique d'inscription
  async register(createUserDto: CreateUserDto) {
    // On passe simplement la demande au UsersService qui sait comment créer un utilisateur
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  // Logique de connexion
  async login(loginDto: CreateUserDto) {
    // 1. On cherche l'utilisateur par son email
    const user = await this.usersService.findOneByEmail(loginDto.email);

    // On vérifie que l'utilisateur existe ET qu'il a un mot de passe enregistré
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. On compare le mot de passe fourni avec celui qui est haché dans la BDD
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Si tout est bon, on crée le "laissez-passer" (token JWT)
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}