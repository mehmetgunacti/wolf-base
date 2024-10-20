import { DefinitionLanguage, DefinitionType, UUID } from '@constants';
import { Entity } from './entity.model';
import { IdBase } from './id-base.model';

export interface Language {

	language: DefinitionLanguage;
	name: string;

}

export interface Definition extends IdBase {

	languages: Language[];
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

	search: string | null;

}

export function definitionName(definition: Definition): string {

	return definition.languages.map(l => `(${l.language}) ${l.name}`).join(', ');

}
