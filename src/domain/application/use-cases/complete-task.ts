import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

interface CompleteTaskUseCaseRequest {
  id: string;
}

@Injectable()
export class CompleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: CompleteTaskUseCaseRequest) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new Error('Resource not found.');
    }

    if(!task.completedAt) {
      task.completedAt = new Date();
    } else {
      task.completedAt = null
    }

    await this.tasksRepository.save(task);

    return { task };
  }
}
