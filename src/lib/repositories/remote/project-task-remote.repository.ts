import { Task } from 'lib/models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface TasksRemoteRepository extends EntityRemoteRepository<Task> {
}
