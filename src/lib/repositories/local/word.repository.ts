import { Word } from '@models/word.model';
import { EntityLocalRepository } from './entity.repository';

export interface WordsLocalRepository extends EntityLocalRepository<Word> { }
