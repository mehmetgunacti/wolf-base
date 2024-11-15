import { Quote } from '@models/quote.model';
import { EntityLocalRepository } from './entity.repository';

export interface QuoteLocalRepository extends EntityLocalRepository<Quote> { }
