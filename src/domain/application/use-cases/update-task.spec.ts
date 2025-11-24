import { makeTask } from 'test/factory/task-factory';
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository';
import { UpdateTaskUseCase } from './update-task';

describe('Update Task UseCase', () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: UpdateTaskUseCase;

  beforeAll(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskUseCase(tasksRepository);
  });

  it('should be able to update a task', async () => {
    tasksRepository.items.push(
      makeTask({ title: 'title-1', description: 'description-1' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-2', description: 'description-2' }),
    );
    tasksRepository.items.push(
      makeTask({ title: 'title-3', description: 'description-3 mode 1' }),
    );

    const id = tasksRepository.items[0].id.toString()

    const title = 'title updated'
    const description = 'description updated'

    await sut.execute({id, title, description});

    expect(tasksRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'title updated'
      })
    )
  });
});
