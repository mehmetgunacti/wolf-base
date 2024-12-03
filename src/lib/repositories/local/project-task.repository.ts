import { Task } from '@models/project.model';
import { EntityLocalRepository } from './entity.repository';

export interface TasksLocalRepository extends EntityLocalRepository<Task> { }
