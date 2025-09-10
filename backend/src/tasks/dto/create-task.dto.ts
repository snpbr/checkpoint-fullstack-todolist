// import { IsNotEmpty, IsString } from 'class-validator';

// /**
//  * C'est le DTO pour la création d'une tâche.
//  * Il définit la "forme" des données attendues lors d'une requête POST sur /tasks.
//  * On utilise les décorateurs de class-validator pour s'assurer que les données sont valides.
//  */
// export class CreateTaskDto {
//   // Le titre doit être une chaîne de caractères (@IsString) il me faut absolument un title
//   // et ne doit pas être vide (@IsNotEmpty).et ce title doit être du texte".
//   @IsString()
//   @IsNotEmpty()
//   title: string;
// }
//import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// // C'est le "formulaire" pour créer un utilisateur
// export class CreateUserDto {
//   @IsEmail({}, { message: 'Please enter a valid email address' })
//   @IsNotEmpty({ message: 'Email should not be empty' })
//   email: string;

//   @IsString()
//   @IsNotEmpty({ message: 'Password should not be empty' })
//   @MinLength(8, { message: 'Password must be at least 8 characters long' })
//   password: string;
// }

import { IsNotEmpty, IsString } from 'class-validator';

// On s'assure que la classe est bien "exportée" pour que d'autres fichiers puissent l'utiliser
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}