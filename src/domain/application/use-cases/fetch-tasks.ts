import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

interface FetchTasksUseCaseRequest {
  search?: string;
}

@Injectable()
export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ search }: FetchTasksUseCaseRequest) {
    const tasks =
      await this.tasksRepository.findManyBySearchInTitleAndDescription(search);

    return { tasks };
  }
}
