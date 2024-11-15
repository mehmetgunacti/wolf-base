import { Project } from '@models/project.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface ProjectsRemoteRepository extends EntityRemoteRepository<Project> { }
