import { INestApplication } from "@nestjs/common"
import { Test } from '@nestjs/testing'
import { resolve } from "path"
import { AppModule } from "src/app.module"
import request from 'supertest'

describe('CreateManyTasksByCSVController ', () => {
  let app: INestApplication

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile()

    app = modules.createNestApplication()

    await app.init()
  })

  test('Create a lot new tasks by a file csv', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').attach('file', resolve('./test/files/upload.csv'))

    expect(response.statusCode).toBe(201)
  })
})