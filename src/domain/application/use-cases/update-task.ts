import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

interface UpdateTaskUseCaseRequest {
  id: string;
  title: string;
  description: string;
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id, title, description }: UpdateTaskUseCaseRequest) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new Error('Resource not found.');
    }

    task.title = title;
    task.description = description;

    await this.tasksRepository.save(task);

    return { task };
  }
}
