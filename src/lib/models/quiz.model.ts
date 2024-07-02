import { Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';

export interface QuizProgress extends Entity {

	next: number;
	level: Progress;

}

export class Quiz {

	constructor(
		public progressId: UUID,
		public question: string,
		public questionId: UUID,
		public choices: string[],
		public choiceIds: UUID[]
	) { }

	onRightAnswer(choiceId: UUID): boolean {

		return this.questionId === choiceId;

	}

}
