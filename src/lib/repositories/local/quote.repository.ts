import { Quote } from '@models/quote.model';
import { EntityLocalRepository } from './entity.repository';

export interface QuotesLocalRepository extends EntityLocalRepository<Quote> { }
