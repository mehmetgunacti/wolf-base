import { Quote } from '@models';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface QuotesRemoteRepository extends EntityRemoteRepository<Quote> {
}
