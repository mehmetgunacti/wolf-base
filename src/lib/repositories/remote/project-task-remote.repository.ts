import { Task } from '@models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface TasksRemoteRepository extends EntityRemoteRepository<Task> {
}
