import { FIRESTORE_VALUE, FirestoreConverter, AppEntityType } from '@lib';
import { FirestoreConfig } from 'lib/models';
import { Note } from 'lib/models/note.model';
import { NotesRemoteRepository } from 'lib/repositories/remote';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class NotesFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Note> implements NotesRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.note,
			new NoteFirestoreConverter()
		);
	}

}

class NoteFirestoreConverter implements FirestoreConverter<Note> {

	toFirestore(note: Note): Record<keyof Note, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Note, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: note.name };
		if (note.parentId)
			fields['parentId'] = { stringValue: note.parentId };
		else
			fields['parentId'] = { nullValue: null }
		fields['tags'] = {
			arrayValue: { values: note.tags.map(v => ({ stringValue: v })) }
		};
		fields['modified'] = { stringValue: note.modified };

		return fields;

	}

	fromFirestore(note: Note): Note {

		// validate incoming
		let { id, name, modified, parentId, tags } = note;
		if (!id)
			throw new Error(`Firestore Note: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Note: invalid 'name' value`);

		if (!modified)
			throw new Error(`Firestore Note: invalid 'name' value`);

		if (!Array.isArray(tags))
			throw new Error(`Firestore Note: invalid 'tags' value`);

		const validated: Note = {

			id,
			name,
			modified,
			parentId: parentId || null,
			tags

		};
		return validated;

	}

	toUpdateMask(note: Partial<Note>): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (note.name)
			fields.add('name');

		// always included, value or null
		fields.add('parentId');

		if (note.tags)
			fields.add('tags');

		if (note.modified)
			fields.add('modified');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
