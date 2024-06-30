import { QuizProgress } from 'lib/constants';
import { Entity } from './entity.model';

export interface QuizEntry extends Entity {

	next: number;
	level: QuizProgress;

}
