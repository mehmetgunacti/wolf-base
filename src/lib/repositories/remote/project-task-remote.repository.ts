import { Task } from '@models/project.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface TasksRemoteRepository extends EntityRemoteRepository<Task> { }
