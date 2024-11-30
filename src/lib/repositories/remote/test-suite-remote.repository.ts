import { TestSuite } from '@models/test-suite.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface TestSuitesRemoteRepository extends EntityRemoteRepository<TestSuite> { }
