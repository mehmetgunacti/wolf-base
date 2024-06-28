import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
import { FirestoreConfig, Word, Definition } from 'lib/models';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class WordsFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Word> implements WordsRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.note,
			new WordFirestoreConverter()
		);
	}

}

class WordDefinitionFirestoreConverter implements FirestoreConverter<Definition> {

	toFirestore(item: Definition): Record<keyof Definition, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Definition, FIRESTORE_VALUE>;

		fields['name'] = { stringValue: item.name };
		fields['language'] = { stringValue: item.language };
		fields['type'] = { stringValue: item.type };
		fields['samples'] = {
			arrayValue: { values: item.samples.map(s => ({ stringValue: s })) }
		};
		return fields;

	}

	fromFirestore(item: Definition): Definition {

		// validate incoming
		let { id, name, language, type, samples } = item;
		if (!id)
			throw new Error(`Firestore WordDefinition: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore WordDefinition: invalid 'name' value`);

		if (!language)
			throw new Error(`Firestore WordDefinition: invalid 'language' value`);

		if (!type)
			throw new Error(`Firestore WordDefinition: invalid 'type' value`);

		if (!Array.isArray(samples))
			throw new Error(`Firestore WordDefinition: invalid 'samples' value`);

		const validated: Definition = {

			id,
			name,
			language,
			type,
			samples

		};
		return validated;

	}

	toUpdateMask(item: Partial<Definition>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (item.name)
			fields.add('name');

		if (item.language)
			fields.add('language');

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

		fields['name'] = { stringValue: entry.name };

		if (entry.pronunciation)
			fields['pronunciation'] = { stringValue: entry.pronunciation };
		else
			fields['pronunciation'] = { nullValue: null }

		if (entry.context)
			fields['context'] = { stringValue: entry.context };
		else
			fields['context'] = { nullValue: null }

		if (entry.dictionary)
			fields['dictionary'] = { stringValue: entry.dictionary };
		else
			fields['dictionary'] = { nullValue: null }

		fields['definitions'] = {
			arrayValue: { values: entry.definitions.map(d => ({ mapValue: { fields: this.definitionConverter.toFirestore(d) } })) }
		};

		return fields;

	}

	fromFirestore(entry: Word): Word {

		// validate incoming
		let { id, name, dictionary, context, pronunciation, definitions } = entry;
		if (!id)
			throw new Error(`Firestore WordEntry: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore WordEntry: invalid 'name' value`);

		if (!Array.isArray(definitions))
			throw new Error(`Firestore WordEntry: invalid 'definitions' value`);

		const validated: Word = {

			id,
			name,
			dictionary,
			context,
			pronunciation,
			definitions

		};
		return validated;

	}

	toUpdateMask(entry: Partial<Word>): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();

		if (entry.name)
			fields.add('name');

		if (entry.dictionary)
			fields.add('dictionary');

		if (entry.context)
			fields.add('context');

		if (entry.definitions)
			fields.add('definitions');

		if (entry.pronunciation)
			fields.add('pronunciation');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
