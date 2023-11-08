import { UUID } from 'lib/constants';
import { KBContent } from 'lib/models';
import { KeyValueRepository } from './key-value.repository';

export interface KBContentsLocalRepository extends KeyValueRepository<KBContent, UUID> { }
