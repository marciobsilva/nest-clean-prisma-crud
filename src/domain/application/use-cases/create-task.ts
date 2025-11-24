import { Task } from 'src/domain/enterprise/entities/task';
import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = Task.create({
      title,
      description,
    });

    await this.tasksRepository.create(task);

    return { task };
  }
}
