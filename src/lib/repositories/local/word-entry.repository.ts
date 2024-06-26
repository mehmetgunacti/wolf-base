import { Word } from 'lib/models';
import { EntityLocalRepository } from './entity.repository';

export interface WordLocalRepository extends EntityLocalRepository<Word> { }
