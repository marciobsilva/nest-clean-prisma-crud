import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { AppModule } from "src/app.module"
import request from 'supertest'

describe('CreateTaskController ', () => {
  let app: INestApplication

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile()

    app = modules.createNestApplication()

    await app.init()
  })

  test('Create a new task', async () => {
    const response = await request(app.getHttpServer()).post('/task').send({
      title: 'Test e2e create',
      description: 'Teste de criação de uma task via test e2e'
    })

    expect(response.statusCode).toBe(201)
  })
})