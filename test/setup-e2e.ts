import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const uniqueSchema = randomUUID()
let prisma: PrismaClient

function generateUniqueDatabaseSchema(uniqueSchema) {
  const database_url = process.env.DATABASE_URL
  
  if(!database_url) {
    throw new Error('DATABASE_URL NOT DEFINED')
  }

  const url = new URL(database_url)

  url.searchParams.set('schema', uniqueSchema)

  return url.toString()
}


beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseSchema(uniqueSchema)

  process.env.DATABASE_URL = databaseURL
  
  const connectionString = `${databaseURL}`
  const url = new URL(connectionString)
  const schemaId = url.searchParams.get('schema') ?? 'public'
  
  prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString
    }, { schema: schemaId })
  })

  execSync('npx prisma migrate deploy')
  
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${uniqueSchema}" CASCADE`)
  await prisma.$disconnect()
})