import { BadRequestException, Body, Controller, Param, Put } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UpdateTaskUseCase } from 'src/domain/application/use-cases/update-task';
import { TasksRepository } from 'src/domain/application/repositories/tasks-repository';

export const updateTaskSchema = z.object({
  title: z.string(),
  description: z.string()
})

export type UpdateTaskBody = z.infer<typeof updateTaskSchema>

@Controller('/task')
export class UpdateTaskController {
  constructor(
    private updateTaskUseCase: UpdateTaskUseCase, 
    private taskRepository: TasksRepository
  ) {}

  @Put('/:id')
  async handle(
    @Param('id') id: string, 
    @Body(new ZodValidationPipe(updateTaskSchema)) body: UpdateTaskBody
  ) {
    const { title, description } = body

    const task = await this.taskRepository.findById(id)

    if(!task) {
      throw new BadRequestException('Resource not found')
    }

    const taskUpdated = await this.updateTaskUseCase.execute({ id, title, description })
  
    return { task: taskUpdated }
  }
}
