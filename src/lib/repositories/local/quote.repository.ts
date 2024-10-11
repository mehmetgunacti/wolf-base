import { Quote } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface QuoteLocalRepository extends EntityLocalRepository<Quote> { }
