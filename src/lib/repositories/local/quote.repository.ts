import { Quote } from '@models';
import { EntityLocalRepository } from './entity.repository';

export interface QuoteLocalRepository extends EntityLocalRepository<Quote> { }
