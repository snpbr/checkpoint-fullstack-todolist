import { IsNotEmpty, IsString } from 'class-validator';

/**
 * C'est le DTO pour la création d'une tâche.
 * Il définit la "forme" des données attendues lors d'une requête POST sur /tasks.
 * On utilise les décorateurs de class-validator pour s'assurer que les données sont valides.
 */
export class CreateTaskDto {
  // Le titre doit être une chaîne de caractères (@IsString) il me faut absolument un title
  // et ne doit pas être vide (@IsNotEmpty).et ce title doit être du texte".
  @IsString()
  @IsNotEmpty()
  title: string;
}
