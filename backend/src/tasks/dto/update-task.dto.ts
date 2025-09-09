import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// 
//  C'est le DTO pour la mise à jour d'une tâche.
//  Il hérite de CreateTaskDto avec PartialType, mise à jour tout en rendant les champs optionnels.
//  On peut donc mettre à jour uniquement le titre, ou uniquement le statut, ou les deux.
//  
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // On ajoute une propriété "isCompleted" qui est optionnelle (@IsOptional)
  // et qui doit être un booléen (@IsBoolean).
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
