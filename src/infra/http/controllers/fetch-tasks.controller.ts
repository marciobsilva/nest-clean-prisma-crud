import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { FetchTasksUseCase } from 'src/domain/application/use-cases/fetch-tasks';

export const fetchTasksSchema = z.object({
  search: z.string().optional(),
})

export type FetchTasksBody = z.infer<typeof fetchTasksSchema>

@Controller('/task')
export class FetchTasksController {
  constructor(private fetchTasksUseCase: FetchTasksUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(fetchTasksSchema))
  async handle(@Query() { search }: FetchTasksBody) {
    const { tasks } = await this.fetchTasksUseCase.execute({ search })
    return { tasks }
  }
}
