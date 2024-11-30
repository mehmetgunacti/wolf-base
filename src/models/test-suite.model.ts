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

	description: string | null;
	tests: Test[];

}
