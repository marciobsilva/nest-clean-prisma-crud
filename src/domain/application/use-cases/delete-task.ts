import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

interface DeleteTaskUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskUseCaseRequest) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new Error('Resource not found.');
    }

    await this.tasksRepository.delete(task)

    return { task };
  }
}
