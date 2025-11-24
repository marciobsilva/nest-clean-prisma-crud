import { makeTask } from 'test/factory/task-factory';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';
import { CompleteTaskUseCase } from './complete-task';

describe('Complete Task UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: CompleteTaskUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CompleteTaskUseCase(tasksRepository);
  });

  it('should be able to complete a task', async () => {
    tasksRepository.items.push(
      makeTask({ title: 'title-1', description: 'description-1' }),
    );

    const id = tasksRepository.items[0].id.toString()

    await sut.execute({ id });

    expect(tasksRepository.items[0]).toEqual(
      expect.objectContaining({
        completedAt: expect.anything()
      })
    )

    await sut.execute({ id });

    expect(tasksRepository.items[0]).toEqual(
      expect.objectContaining({
        completedAt: null
      })
    )
  });
});
