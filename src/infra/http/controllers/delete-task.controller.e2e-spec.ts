import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { AppModule } from "src/app.module"
import { TasksRepository } from "src/domain/application/repositories/tasks-repository"
import request from 'supertest'
import { makeTask } from "test/factory/task-factory"

describe('DeleteTaskController ', () => {
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

  test('Delete a task', async () => {
    const task = makeTask()

    await tasksRepository.create(task)

    const response = await request(app.getHttpServer()).delete(`/task/${task.id.toString()}`).send()

    expect(response.statusCode).toBe(200)
  })
})