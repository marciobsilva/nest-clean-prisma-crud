import { Injectable } from "@nestjs/common";
import { TasksRepository } from "src/domain/application/repositories/tasks-repository";
import { Task } from "src/domain/enterprise/entities/task";
import { PrismaService } from "../prisma.service";
import { PrismaTaskMapper } from "../mappers/prisma-task-mapper";

@Injectable()
export class PrismaTaskRepository implements TasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(task: Task) {
    const data = PrismaTaskMapper.toPrisma(task)
    
    await this.prisma.task.create({
      data
    })
  }

  async createMany(tasks: Task[]) {
    const data = tasks.map( task => PrismaTaskMapper.toPrisma(task))

    await this.prisma.task.createMany({
      data
    })
  }

  async save(task: Task) {
    const data = PrismaTaskMapper.toPrisma(task)

    await this.prisma.task.update({
      data,
      where: {
        id: task.id.toString()
      }
    })
  }

  async delete(task: Task) {
    await this.prisma.task.delete({
      where: {
        id: task.id.toString()
      }
    })
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    })

    if(!task) {
      return null
    }

    return PrismaTaskMapper.toDomain(task)
  }

  async findManyBySearchInTitleAndDescription(search?: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search ?? ""
            }
          },
          {
            description: {
              contains: search ?? ""
            }
          }
        ]
      }
    })

    return tasks.map( task => PrismaTaskMapper.toDomain(task))
  }
}