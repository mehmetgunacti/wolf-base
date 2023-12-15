import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
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
			WolfEntity.note,
			new NoteFirestoreConverter()
		);
	}

}

class NoteFirestoreConverter implements FirestoreConverter<Note> {

	toFirestore(note: Note): Record<keyof Note, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Note, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: note.name };
		fields['content'] = { stringValue: note.content };
		fields['tags'] = {
			arrayValue: { values: note.tags.map(v => ({ stringValue: v })) }
		};

		return fields;

	}

	toUpdateMask(note: Partial<Note>): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (note.name)
			fields.add('name');

		if (note.content)
			fields.add('content');

		if (note.tags)
			fields.add('tags');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
