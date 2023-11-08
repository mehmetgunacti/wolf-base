import { KBEntry } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface KBEntriesLocalRepository extends EntityLocalRepository<KBEntry> { }
