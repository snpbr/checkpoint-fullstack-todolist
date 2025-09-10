import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Étape 1: Charger les variables d'environnement (depuis docker-compose.yml)
    ConfigModule.forRoot({
      isGlobal: true, // Rend les variables accessibles partout dans l'app
    }),

    // Étape 2: Configurer la connexion à la base de données
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      // CORRECTION ICI : On donne une valeur par défaut AVANT d'appeler parseInt
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Cherche automatiquement les fichiers d'entités
      
      // ATTENTION: synchronize: true est UNIQUEMENT pour le développement.
      // Il met à jour automatiquement le schéma de la BDD.
      // En production, on utilise des migrations.
      synchronize: true, 
    }),

    TasksModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

