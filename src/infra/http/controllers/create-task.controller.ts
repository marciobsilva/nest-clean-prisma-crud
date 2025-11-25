import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/domain/application/use-cases/create-task';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string()
})

export type CreateTaskBody = z.infer<typeof createTaskSchema>

@Controller('/task')
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  handle(@Body() { title, description }: CreateTaskBody) {
    this.createTaskUseCase.execute({ title, description })
  }
}
