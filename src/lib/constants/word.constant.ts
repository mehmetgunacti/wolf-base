import { HasParentId } from 'lib/models'

export enum WordProgress {

	START = 'START',
	LEVEL_ONE = 'LEVEL_ONE',
	LEVEL_TWO = 'LEVEL_TWO',
	LEVEL_THREE = 'LEVEL_THREE',
	LEVEL_FOUR = 'LEVEL_FOUR',
	LEVEL_FIVE = 'LEVEL_FIVE',
	FINISHED = 'FINISHED:'

}

export enum DefinitionLanguage {

	en = 'en',
	de = 'de',
	tr = 'tr'

}

const DefinitionLanguageLabels: Record<string, string> = {

	[DefinitionLanguage.en]: 'English',
	[DefinitionLanguage.de]: 'Deutsch',
	[DefinitionLanguage.tr]: 'Türkçe'

}

export const DEFINITION_LANGUAGES: HasParentId[] = Object.keys(DefinitionLanguageLabels).map(k => ({ id: k, name: DefinitionLanguageLabels[k], parentId: null }));

export enum DefinitionType {

	verb = 'v',
	noun = 'n',
	adjective = 'adj'

}

const DefinitionTypeLabels: Record<string, string> = {

	[DefinitionType.verb]: 'Verb',
	[DefinitionType.noun]: 'Noun',
	[DefinitionType.adjective]: 'Adjective'

}

export const DEFINITION_TYPES: HasParentId[] = Object.keys(DefinitionTypeLabels).map(k => ({ id: k, name: DefinitionTypeLabels[k], parentId: null }));
