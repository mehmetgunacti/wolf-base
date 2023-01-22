import { RemoteCollection } from 'blueprints/constants';
import { INote } from 'blueprints/models';
import { FirestoreTool, IFirestoreDocument, FIRESTORE_VALUE } from 'blueprints/tools';
import { AbstractFirestoreCollection } from '../firestore.collection';

export class NotesFirestoreCollection extends AbstractFirestoreCollection<INote> {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.notes);
	}

	protected createRequestBody(note: Partial<INote>): IFirestoreDocument {

		const fields: { [key: string]: FIRESTORE_VALUE } = {};

		if (note.title)
			fields.title = { stringValue: note.title };

		if (note.content)
			fields.content = { stringValue: note.content };

		if (note.tags)
			fields.tags = {
				arrayValue: { values: note.tags.map(v => ({ stringValue: v })) }
			};

		if (note.backgroundColor)
			fields.backgroundColor = { stringValue: note.backgroundColor };

		return { fields };
	}

	protected createUpdateMask(note: INote): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (note.title)
			fields.add('title');

		if (note.content)
			fields.add('content');

		if (note.tags)
			fields.add('tags');

		if (note.backgroundColor)
			fields.add('backgroundColor');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
