// import { Module } from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { TasksController } from './tasks.controller';

// @Module({
//   controllers: [TasksController],
//   providers: [TasksService],
// })
// export class TasksModule {}
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  // On ajoute cette ligne pour dire à ce module :
  // "Tu as le droit d'utiliser l'entité Task, et donc son Repository."
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
