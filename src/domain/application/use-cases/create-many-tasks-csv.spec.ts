import { resolve } from 'path';
import { CreateManyTasksCsvUseCase } from './create-many-tasks-csv';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';

describe('Create Many Tasks UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: CreateManyTasksCsvUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateManyTasksCsvUseCase(tasksRepository);
  });

  it('should be able to create many tasks os a file csv', async () => {
    await sut.execute({
      csvPath: resolve('test/files/upload.csv'),
    });

    expect(tasksRepository.items).toHaveLength(3);
  });
});
