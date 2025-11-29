import { BadRequestException, Body, Controller, Param, Patch, Post, Put, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UpdateTaskUseCase } from 'src/domain/application/use-cases/update-task';
import { TasksRepository } from 'src/domain/application/repositories/tasks-repository';
import { CompleteTaskUseCase } from 'src/domain/application/use-cases/complete-task';
import { TaskPresenter } from '../presenters/TaskPresenter';

@Controller('/task')
export class CompleteTaskController {
  constructor(
    private completeTaskUseCase: CompleteTaskUseCase, 
    private taskRepository: TasksRepository
  ) {}

  @Patch('/:id/complete')
  async handle(@Param('id') id: string) {
    const task = await this.taskRepository.findById(id)

    if(!task) {
      throw new BadRequestException('Resource not found')
    }

    const { task: taskCompleted } = await this.completeTaskUseCase.execute({ id })
  
    return { task: TaskPresenter.toHTTP(taskCompleted) }
  }
}
