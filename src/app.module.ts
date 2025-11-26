import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTaskController } from './infra/http/controllers/create-task.controller';
import { CreateTaskUseCase } from './domain/application/use-cases/create-task';
import { TasksRepository } from './domain/application/repositories/tasks-repository';
import { FetchTasksController } from './infra/http/controllers/fetch-tasks.controller';
import { FetchTasksUseCase } from './domain/application/use-cases/fetch-tasks';
import { UpdateTaskController } from './infra/http/controllers/update-task.controller';
import { UpdateTaskUseCase } from './domain/application/use-cases/update-task';
import { DeleteTaskController } from './infra/http/controllers/delete-task.controller';
import { DeleteTaskUseCase } from './domain/application/use-cases/delete-task';
import { CreateManyTasksCsvController } from './infra/http/controllers/create-many-tasks-by-csv.controller';
import { CreateManyTasksCsvUseCase } from './domain/application/use-cases/create-many-tasks-csv';
import { CompleteTaskController } from './infra/http/controllers/complete-task.controller';
import { CompleteTaskUseCase } from './domain/application/use-cases/complete-task';
import { PrismaTaskRepository } from './infra/database/prisma/repositories/PrismaTaskRepository';
import { PrismaService } from './infra/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, CreateTaskController, FetchTasksController, UpdateTaskController, DeleteTaskController, CompleteTaskController, CreateManyTasksCsvController],
  providers: [PrismaService, AppService, CreateTaskUseCase, FetchTasksUseCase, UpdateTaskUseCase, DeleteTaskUseCase, CompleteTaskUseCase, CreateManyTasksCsvUseCase, {
    provide: TasksRepository,
    useClass: PrismaTaskRepository
  }],
})
export class AppModule {}
