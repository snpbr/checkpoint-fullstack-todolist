import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  // On "injecte" le Repository pour l'entité Task.
  // C'est notre outil pour parler à la table "task" en base de données.
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // --- CRÉER UNE TÂCHE ---
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // On crée une nouvelle instance de Task avec les données du DTO.
    const newTask = this.taskRepository.create(createTaskDto);
    // On sauvegarde cette nouvelle tâche en base de données.
    return this.taskRepository.save(newTask);
  }

  // --- RÉCUPÉRER TOUTES LES TÂCHES ---
  async findAll(): Promise<Task[]> {
    // On utilise la méthode find() du repository pour tout récupérer.
    return this.taskRepository.find();
  }

  // --- RÉCUPÉRER UNE TÂCHE PAR SON ID ---
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    // Si la tâche n'est pas trouvée, on lève une erreur 404.
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  // --- METTRE À JOUR UNE TÂCHE ---
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // On cherche la tâche existante. `preload` est pratique : il trouve la tâche
    // et la fusionne avec les nouvelles données du DTO.
    const taskToUpdate = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    // Si la tâche n'existe pas, on lève une erreur 404.
    if (!taskToUpdate) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    // On sauvegarde la tâche mise à jour.
    return this.taskRepository.save(taskToUpdate);
  }

  // --- SUPPRIMER UNE TÂCHE ---
  async remove(id: number): Promise<Task> {
    // D'abord, on trouve la tâche qu'on veut supprimer.
    const taskToRemove = await this.findOne(id);
    // Ensuite, on la supprime de la base de données.
    return this.taskRepository.remove(taskToRemove);
  }
}
