import { RemoteCollection } from 'blueprints/constants';
import { IWord } from 'blueprints/models';
import { FirestoreTool, IFirestoreDocument, FIRESTORE_VALUE } from 'blueprints/tools';
import { AbstractFirestoreCollection } from '../firestore.collection';

export class WordsFirestoreCollection extends AbstractFirestoreCollection<IWord> {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.words);
	}

	protected createRequestBody(word: Partial<IWord>): IFirestoreDocument {

		const fields: { [key: string]: FIRESTORE_VALUE } = {};

		if (word.term)
			fields.term = { stringValue: word.term };

		if (word.language)
			fields.language = { stringValue: word.language };

		if (word.tags)
			fields.tags = {
				arrayValue: { values: word.tags.map(v => ({ stringValue: v })) }
			};

		if (word.definitions)
			fields.definitions = {
				arrayValue: {
					values: []
				}
			};

		return { fields };
	}

	protected createUpdateMask(word: IWord): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (word.term)
			fields.add('term');

		if (word.language)
			fields.add('language');

		if (word.pronunciation)
			fields.add('pronunciation');

		if (word.definitions)
			fields.add('definitions');

		if (word.tags)
			fields.add('tags');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
