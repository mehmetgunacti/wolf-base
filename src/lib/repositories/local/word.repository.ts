import { Word } from '@models';
import { EntityLocalRepository } from './entity.repository';

export interface WordLocalRepository extends EntityLocalRepository<Word> { }
