import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { AppModule } from "src/app.module"
import { TasksRepository } from "src/domain/application/repositories/tasks-repository"
import request from 'supertest'
import { makeTask } from "test/factory/task-factory"

describe('UpdateTaskController ', () => {
  let app: INestApplication
  let tasksRepository: TasksRepository

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile()

    app = modules.createNestApplication()
    tasksRepository = modules.get(TasksRepository)

    await app.init()
  })

  test('Update a task', async () => {
    const task = makeTask()

    await tasksRepository.create(task)

    const response = await request(app.getHttpServer()).put(`/task/${task.id.toString()}`).send({
      title: 'Novo titulo',
      description: 'Nova descricao'
    })

    expect(response.body.task).toEqual(
      expect.objectContaining({
        title: 'Novo titulo',
        description: 'Nova descricao'
      })
    )
  })
})