import { Entity } from './entity.model';
import { IdBase, ISODateString, NameBase } from './id-base.model';

export interface Answer extends IdBase {

	choices: boolean[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Session extends Entity {

	answers: Answer[];
	start: ISODateString;
	end: ISODateString | null;

}

export interface Question extends IdBase {

	answers: boolean[];
	description: string | null;

}

export interface Test extends NameBase {

	questions: Question[];
	description: string | null;

}

export interface TestSuite extends Entity {

	description: string | null;
	tests: Test[];

}
