import { Quote } from '@models/quote.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface QuotesRemoteRepository extends EntityRemoteRepository<Quote> { }
