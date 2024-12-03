import { TestSuite } from '@models/test-suite.model';
import { EntityLocalRepository } from './entity.repository';

export interface TestSuitesLocalRepository extends EntityLocalRepository<TestSuite> { }
