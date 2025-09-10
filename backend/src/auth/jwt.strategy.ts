import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // On dit à notre stratégie où trouver le token dans la requête
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // On ne veut pas que la stratégie échoue si le token est expiré, on le gérera nous-mêmes
      ignoreExpiration: false,
      // On fournit la même clé secrète que celle utilisée pour créer le token
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Cette méthode sera appelée par NestJS après avoir validé le token
  // Elle nous permet de retourner un "user" qui sera attaché à la requête
  async validate(payload: any) {
    // Le payload contient les données qu'on a mises dans le token (on mettra l'ID de l'utilisateur)
    return { userId: payload.sub };
  }
}
