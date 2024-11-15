import { Entity } from './entity.model';
import { IdBase, ISODateString } from './id-base.model';

export interface Answer extends IdBase {

	choices: number[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Session extends IdBase {

	answers: Answer[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Question extends IdBase {

	numberOfChoices: number;
	answers: number[];


}

export interface Test extends IdBase {

	questions: Question[];
	sessions: Session[];

}

export interface TestSuite extends Entity {

	tests: Test[];

}


export interface TestSuiteQueryParams {

	search: string | null

}

// export interface TaskQueryParams {

// 	search: string | null,
// 	status: TaskState | 'all',
// 	category: TaskCategory | 'all',
// 	tags: string[]

// }

