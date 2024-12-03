import { Project } from '@models/project.model';
import { EntityLocalRepository } from './entity.repository';

export interface ProjectsLocalRepository extends EntityLocalRepository<Project> { }
