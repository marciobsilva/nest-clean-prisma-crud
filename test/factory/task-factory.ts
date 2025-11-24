import { Task, TaskProps } from 'src/domain/enterprise/entities/task';
import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/unique-entity-id';

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityID,
) {
  const task = Task.create(
    {
      title: faker.lorem.words(3),
      description: faker.lorem.words(10),
      ...override,
    },
    id,
  );

  return task;
}
