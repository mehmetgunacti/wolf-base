import { FIRESTORE_VALUE, FirestoreConverter, WolfEntity } from '@lib';
import { FirestoreConfig } from 'lib/models';
import { NoteContent } from 'lib/models/note.model';
import { NoteContentRemoteRepository } from 'lib/repositories/remote';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class NoteContentContentFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<NoteContent> implements NoteContentRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.note,
			new NoteContentFirestoreConverter()
		);
	}

}

class NoteContentFirestoreConverter implements FirestoreConverter<NoteContent> {

	toFirestore(note: NoteContent): Record<keyof NoteContent, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof NoteContent, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: note.name };
		fields['content'] = { stringValue: note.content };
		return fields;

	}

	toUpdateMask(note: Partial<NoteContent>): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (note.name)
			fields.add('name');

		if (note.content)
			fields.add('content');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
