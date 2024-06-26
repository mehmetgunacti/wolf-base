import { DefinitionLanguage, DefinitionType } from 'lib/constants/word.constant';
import { Entity } from './entity.model';
import { IDBase } from './id-base.model';
import { UUID } from 'lib/constants';

export interface WordDefinition extends IDBase {

	entry: UUID;
	language: DefinitionLanguage;
	type: DefinitionType;
	meaning: string;
	samples: string[];

}

export interface WordEntry extends Entity {

	dictionary: UUID | null;
	definitions: WordDefinition[];
	context: string | null;
	pronunciation: string | null;

}
