import { Exam } from '@models/test-suite.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface ExamsRemoteRepository extends EntityRemoteRepository<Exam> { }
