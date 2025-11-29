import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { AppModule } from "src/app.module"
import { TasksRepository } from "src/domain/application/repositories/tasks-repository"
import request from 'supertest'
import { makeTask } from "test/factory/task-factory"

describe('FetchTasksController ', () => {
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

  test('Fetch tasks', async () => {
    const task = makeTask()

    await tasksRepository.create(task)

    const response = await request(app.getHttpServer()).get(`/task`).send()

    expect(response.body.tasks).toHaveLength(1)
  })
})