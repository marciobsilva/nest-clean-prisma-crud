import { Task } from 'src/domain/enterprise/entities/task';
import { TasksRepository } from '../repositories/tasks-repository';
import { Injectable } from '@nestjs/common';

import csv from 'csv-parser'
import fs from 'node:fs'


interface CreateManyTasksCsvUseCaseRequest {
  csvPath: string;
}

interface CreateManyTasksCsvUseCaseResponse {
  tasks: Task[];
}

@Injectable()
export class CreateManyTasksCsvUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    csvPath
  }: CreateManyTasksCsvUseCaseRequest): Promise<CreateManyTasksCsvUseCaseResponse> {
    const tasks: Task[] = [];

    const tasksStream = fs.createReadStream(csvPath)
      .pipe(csv())

    for await (const row of tasksStream) {
      const task = Task.create(row)
      tasks.push(task)
    }
      
    await this.tasksRepository.createMany(tasks);

    return { tasks };
  }
}
