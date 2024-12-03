import { Session } from '@models/test-suite.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface SessionsRemoteRepository extends EntityRemoteRepository<Session> { }
