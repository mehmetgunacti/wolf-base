import { Entity } from './entity.model';
import { IDBase, ISODateString } from './id-base.model';

export interface Answer extends IDBase {

	choices: number[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Session extends IDBase {

	answers: Answer[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Question extends IDBase {

	numberOfChoices: number;
	answers: number[];


}

export interface Test extends IDBase {

	questions: Question[];
	sessions: Session[];

}

export interface TestSuite extends Entity {

	tests: Test[];

}
