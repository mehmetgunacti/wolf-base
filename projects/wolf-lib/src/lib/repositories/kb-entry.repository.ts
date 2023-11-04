import { KBEntry } from 'lib/models';
import { EntityRepository } from './entity.repository';

export interface KBEntriesRepository extends EntityRepository<KBEntry> { }
