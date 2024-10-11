import { Project } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface ProjectLocalRepository extends EntityLocalRepository<Project> { }
