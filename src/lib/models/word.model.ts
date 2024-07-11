import { UUID } from 'lib/constants';
import { DefinitionLanguage, DefinitionType } from 'lib/constants/word.constant';
import { Entity } from './entity.model';
import { NameBase } from './id-base.model';

// export interface Language {

// 	language: DefinitionLanguage;
// 	name: string;

// }

// export interface Definition extends IDBase {

// 	languages: Language[];
// 	type: DefinitionType;
// 	samples: string[];

// }

export interface Definition extends NameBase {

	language: DefinitionLanguage;
	type: DefinitionType;
	samples: string[];

}

export interface Word extends Entity {

	dictionary: UUID | null;
	definitions: Definition[];
	contexts: string[];
	pronunciation: string | null;

}

export interface WordQueryParams {

	search: string | null

}
