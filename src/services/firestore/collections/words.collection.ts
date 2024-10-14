import { AppEntityType } from '@constants';
import { Definition, FirestoreConfig, Language, Word } from '@models';
import { WordsRemoteRepository } from '@repositories';
import { FIRESTORE_VALUE, FirestoreConverter } from '@utils';
import { FirestoreAPIClient } from '@utils';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class WordsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Word> implements WordsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.word,
			new WordFirestoreConverter()
		);
	}

}

class WordLanguageFirestoreConverter implements FirestoreConverter<Language> {

	toFirestore(item: Language): Record<keyof Language, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Language, FIRESTORE_VALUE>;
		fields[ 'name' ] = { stringValue: item.name };
		fields[ 'language' ] = { stringValue: item.language };
		return fields;

	}

	fromFirestore(item: Language): Language {

		// validate incoming
		let { name, language } = item;

		if (!name)
			throw new Error(`Firestore WordLanguage: invalid 'name' value`);

		if (!language)
			throw new Error(`Firestore WordLanguage: invalid 'language' value`);

		const validated: Language = {

			name,
			language

		};
		return validated;

	}

	toUpdateMask(item: Partial<Language>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (item.name)
			fields.add('name');

		if (item.language)
			fields.add('language');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}

class WordDefinitionFirestoreConverter implements FirestoreConverter<Definition> {

	languageConverter: WordLanguageFirestoreConverter = new WordLanguageFirestoreConverter();

	toFirestore(item: Definition): Record<keyof Definition, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Definition, FIRESTORE_VALUE>;

		fields[ 'id' ] = { stringValue: item.id };
		// fields['name'] = { stringValue: item.name };
		// fields['language'] = { stringValue: item.language };
		fields[ 'type' ] = { stringValue: item.type };
		fields[ 'samples' ] = {
			arrayValue: { values: item.samples.map(s => ({ stringValue: s })) }
		};
		fields[ 'languages' ] = {
			arrayValue: { values: item.languages.map(d => ({ mapValue: { fields: this.languageConverter.toFirestore(d) } })) }
		};
		return fields;

	}

	fromFirestore(item: Definition): Definition {

		// validate incoming
		let { id, languages, type, samples } = item;

		if (!id)
			throw new Error(`Firestore WordDefinition: invalid 'id' value`);

		if (!Array.isArray(languages))
			throw new Error(`Firestore WordDefinition: invalid 'languages' value`);

		if (!type)
			throw new Error(`Firestore WordDefinition: invalid 'type' value`);

		if (!Array.isArray(samples))
			throw new Error(`Firestore WordDefinition: invalid 'samples' value`);

		const validated: Definition = {

			id,
			languages,
			type,
			samples

		};
		return validated;

	}

	toUpdateMask(item: Partial<Definition>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (item.id)
			fields.add('id');

		if (item.languages)
			fields.add('languages');

		if (item.type)
			fields.add('type');

		if (item.samples)
			fields.add('samples');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}

class WordFirestoreConverter implements FirestoreConverter<Word> {

	definitionConverter: WordDefinitionFirestoreConverter = new WordDefinitionFirestoreConverter();

	toFirestore(entry: Word): Record<keyof Word, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Word, FIRESTORE_VALUE>;

		fields[ 'name' ] = { stringValue: entry.name };

		if (entry.pronunciation)
			fields[ 'pronunciation' ] = { stringValue: entry.pronunciation };
		else
			fields[ 'pronunciation' ] = { nullValue: null };

		fields[ 'contexts' ] = {
			arrayValue: { values: entry.contexts.map(s => ({ stringValue: s })) }
		};

		if (entry.dictionary)
			fields[ 'dictionary' ] = { stringValue: entry.dictionary };
		else
			fields[ 'dictionary' ] = { nullValue: null };

		fields[ 'definitions' ] = {
			arrayValue: { values: entry.definitions.map(d => ({ mapValue: { fields: this.definitionConverter.toFirestore(d) } })) }
		};

		return fields;

	}

	fromFirestore(entry: Word): Word {

		// validate incoming
		let { id, name, dictionary, contexts, pronunciation, definitions } = entry;
		if (!id)
			throw new Error(`Firestore WordEntry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore WordEntry: invalid 'name' value`);

		if (!Array.isArray(contexts))
			throw new Error(`Firestore WordEntry: invalid 'contexts' value`);

		if (!Array.isArray(definitions))
			throw new Error(`Firestore WordEntry: invalid 'definitions' value`);

		const validated: Word = {

			id,
			name,
			dictionary: dictionary ?? null,
			pronunciation: pronunciation ?? null,
			contexts,
			definitions: definitions.map(d => this.definitionConverter.fromFirestore(d))

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Word>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		// if (entry.dictionary)
		fields.add('dictionary');

		// if (entry.pronunciation)
		fields.add('pronunciation');

		if (entry.contexts)
			fields.add('contexts');

		if (entry.definitions)
			fields.add('definitions');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
