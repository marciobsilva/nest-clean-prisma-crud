import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/enterprise/entities/task';

@Injectable()
export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract createMany(tasks: Task[]): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract delete(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findManyBySearchInTitleAndDescription(
    search?: string,
  ): Promise<Task[]>;
}
