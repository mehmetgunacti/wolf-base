import { Project } from '@models/project.model';
import { EntityLocalRepository } from './entity.repository';

export interface ProjectLocalRepository extends EntityLocalRepository<Project> { }
