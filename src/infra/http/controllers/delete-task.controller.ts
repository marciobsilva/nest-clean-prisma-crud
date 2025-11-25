import { BadRequestException, Body, Controller, Delete, Param } from '@nestjs/common';
import { TasksRepository } from 'src/domain/application/repositories/tasks-repository';
import { DeleteTaskUseCase } from 'src/domain/application/use-cases/delete-task';

@Controller('/task')
export class DeleteTaskController {
  constructor(
    private deleteTaskUseCase: DeleteTaskUseCase, 
    private taskRepository: TasksRepository
  ) {}

  @Delete('/:id')
  async handle(
    @Param('id') id: string, 
  ) {
    const task = await this.taskRepository.findById(id)

    if(!task) {
      throw new BadRequestException('Resource not found')
    }

    const taskUpdated = await this.deleteTaskUseCase.execute({ id })
  }
}
