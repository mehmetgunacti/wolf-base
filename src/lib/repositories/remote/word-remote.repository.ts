import { Word } from '@models/word.model';
import { EntityRemoteRepository } from './entity-remote.repository';

export interface WordsRemoteRepository extends EntityRemoteRepository<Word> { }
