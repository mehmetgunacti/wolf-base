import { UUID } from 'lib/constants';
import { KBContent } from 'lib/models';
import { KeyValueRepository } from './key-value.repository';

export interface KBContentsRepository extends KeyValueRepository<KBContent, UUID> { }
