import { Entity } from 'src/core/entity';
import { Optional } from 'src/core/types/Optional';
import { UniqueEntityID } from 'src/core/unique-entity-id';

export interface TaskProps {
  title: string;
  description: string;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Task extends Entity<TaskProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get completedAt() {
    return this.props.completedAt;
  }

  set completedAt(completedAt: Date | null | undefined) {
    this.props.completedAt = completedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: UniqueEntityID) {
    const task = new Task(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return task;
  }
}
