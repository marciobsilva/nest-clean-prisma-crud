import { TasksRepository } from 'src/domain/application/repositories/tasks-repository';
import { Task } from 'src/domain/enterprise/entities/task';

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(task: Task) {
    this.items.push(task);
  }

  async createMany(tasks: Task[]) {
    this.items = this.items.concat(tasks);
  }

  async save(task: Task) {
    const taskIndex = this.items.findIndex((taskDb) => taskDb.id === task.id);

    if (taskIndex <= -1) {
      throw new Error('Resource not found');
    }

    this.items[taskIndex] = task;
  }

  async findById(id: string) {
    const task = this.items.find((task) => task.id.toString() === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async findManyBySearchInTitleAndDescription(search?: string) {
    return this.items.filter(
      (task) =>
        task.title.includes(search ?? '') ||
        task.description.includes(search ?? ''),
    );
  }

  async delete(task: Task) {
    const taskIndex = this.items.findIndex((taskDb) => taskDb.id === task.id);

    if (taskIndex <= -1) {
      throw new Error('Resource not found');
    }

    await this.items.splice(taskIndex, 1);
  }
}
