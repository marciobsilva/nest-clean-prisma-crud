import { makeTask } from 'test/factory/task-factory';
import { FetchTasksUseCase } from './fetch-tasks';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';

describe('Fetch Tasks UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: FetchTasksUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new FetchTasksUseCase(tasksRepository);
  });

  it('should be able to fetch tasks', async () => {
    tasksRepository.items.push(
      makeTask({ title: 'title-1', description: 'description-1' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-2', description: 'description-2' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-3', description: 'description-3 mode 1' }),
    );

    const response = await sut.execute({});

    expect(response.tasks).toHaveLength(3);
  });

  it('should be able to fetch tasks filtered by title and description', async () => {
    const response = await sut.execute({ search: '1' });

    expect(response.tasks).toHaveLength(2);
    expect(response.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'title-1' }),
        expect.objectContaining({ description: 'description-3 mode 1' }),
      ]),
    );
  });

  it('should not be able to fetch tasks filtered by title and description if not exists', async () => {
    const response = await sut.execute({ search: '4' });

    expect(response.tasks).toHaveLength(0);
  });
});
