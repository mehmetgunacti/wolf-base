import { UUID } from '@constants/common.constant';
import { Entity } from './entity.model';
import { IdBase, ISODateString } from './id-base.model';

export interface Answer extends IdBase {

	choices: boolean[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Session extends Entity {

	testId: UUID;
	answers: Answer[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Question extends IdBase {

	answers: boolean[];
	description: string | null;

}

export interface Exam extends Entity {

	questions: Question[];
	// sessions: Session[];
	description: string | null;

}

export interface TestSuite extends Entity {

	description: string | null;
	tests: Exam[];

}
