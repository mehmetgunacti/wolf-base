import { TestSuite } from '@models/test-suite.model';
import { EntityLocalRepository } from './entity.repository';

export interface TestSuiteLocalRepository extends EntityLocalRepository<TestSuite> { }
