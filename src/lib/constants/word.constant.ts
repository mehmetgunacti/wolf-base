import { NameBase } from '@models'

export enum DefinitionLanguage {

	en = 'en',
	de = 'de',
	tr = 'tr'

}

export const DefinitionLanguageLabels: Record<string, string> = {

	[DefinitionLanguage.en]: 'English',
	[DefinitionLanguage.de]: 'Deutsch',
	[DefinitionLanguage.tr]: 'Türkçe'

}

export const DEFINITION_LANGUAGES: NameBase[] = Object.keys(DefinitionLanguageLabels).map(k => ({ id: k, name: DefinitionLanguageLabels[k] }));

export enum DefinitionType {

	verb = 'v',
	noun = 'n',
	adjective = 'adj'

}

export const DefinitionTypeLabels: Record<string, string> = {

	[DefinitionType.verb]: 'Verb',
	[DefinitionType.noun]: 'Noun',
	[DefinitionType.adjective]: 'Adjective'

}

export const DEFINITION_TYPES: NameBase[] = Object.keys(DefinitionTypeLabels).map(k => ({ id: k, name: DefinitionTypeLabels[k] }));
