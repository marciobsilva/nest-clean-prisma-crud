import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateManyTasksCsvUseCase } from 'src/domain/application/use-cases/create-many-tasks-csv';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'node:fs';
import { TaskPresenter } from '../presenters/TaskPresenter';


export const createManyTasksCsvSchema = z.object({
  mimetype: z.literal('text/csv')
}).loose()

@Controller('/tasks')
export class CreateManyTasksCsvController {
  constructor(private createManyTasksCsvUseCase: CreateManyTasksCsvUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads'
  }))
  async handle(@UploadedFile(new ZodValidationPipe(createManyTasksCsvSchema)) file) {
    try {
      const { tasks } = await this.createManyTasksCsvUseCase.execute({ csvPath: file.path })

      return { tasks: tasks.map( task => TaskPresenter.toHTTP(task)) }
    } finally {
      await fs.unlink(file.path, () => {})
    }
  }
}
