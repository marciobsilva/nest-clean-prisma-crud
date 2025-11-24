import { CreateTaskUseCase } from './create-task';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';

describe('CreateTask UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: CreateTaskUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateTaskUseCase(tasksRepository);
  });

  it('should be able to create a task', async () => {
    const { task } = await sut.execute({
      title: 'new title',
      description: 'new description',
    });

    expect(tasksRepository.items[0]).toBe(task);
  });
});
