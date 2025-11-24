import { makeTask } from 'test/factory/task-factory';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';
import { DeleteTaskUseCase } from './delete-task';

describe('Delete Task UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: DeleteTaskUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTaskUseCase(tasksRepository);
  });

  it('should be able to delete a task', async () => {
    tasksRepository.items.push(
      makeTask({ title: 'title-1', description: 'description-1' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-2', description: 'description-2' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-3', description: 'description-3 mode 1' }),
    );

    const id = tasksRepository.items[1].id.toString()

    await sut.execute({ id });

    expect(tasksRepository.items).toHaveLength(2)
    expect(tasksRepository.items).toEqual([
      expect.objectContaining({title: "title-1"}),
      expect.objectContaining({title: "title-3"})
    ])
  });
});
