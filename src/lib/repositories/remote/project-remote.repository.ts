import { Project } from '@models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface ProjectsRemoteRepository extends EntityRemoteRepository<Project> {
}
