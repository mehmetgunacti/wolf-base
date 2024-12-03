import { Exam } from '@models/test-suite.model';
import { EntityLocalRepository } from './entity.repository';

export interface ExamsLocalRepository extends EntityLocalRepository<Exam> { }
