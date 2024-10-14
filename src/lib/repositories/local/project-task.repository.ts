import { Task } from '@models';
import { EntityLocalRepository } from './entity.repository';

export interface TaskLocalRepository extends EntityLocalRepository<Task> { }
