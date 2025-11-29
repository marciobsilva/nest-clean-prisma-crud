import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { AppModule } from "src/app.module"
import { TasksRepository } from "src/domain/application/repositories/tasks-repository"
import request from 'supertest'
import { makeTask } from "test/factory/task-factory"

describe('CompleteTaskController ', () => {
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

  test('Complete a task', async () => {
    const task = makeTask()

    await tasksRepository.create(task)

    const response = await request(app.getHttpServer()).patch(`/task/${task.id.toString()}/complete`).send()

    expect(response.body.task.completedAt).toBeTruthy()
  })

  test('Undo complete a task', async () => {
    const task = makeTask()

    await tasksRepository.create(task)

    await request(app.getHttpServer()).patch(`/task/${task.id.toString()}/complete`).send()
    const response = await request(app.getHttpServer()).patch(`/task/${task.id.toString()}/complete`).send()

    expect(response.body.task.completedAt).toBeFalsy()
  })
})