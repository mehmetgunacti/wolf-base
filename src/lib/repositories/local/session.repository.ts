import { Session } from '@models/test-suite.model';
import { EntityLocalRepository } from './entity.repository';

export interface SessionsLocalRepository extends EntityLocalRepository<Session> { }
