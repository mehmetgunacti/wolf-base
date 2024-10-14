import { AppEntityType } from '@constants';
import { FirestoreConfig } from '@models';
import { NoteContent } from '@models';
import { NoteContentRemoteRepository } from '@repositories';
import { FIRESTORE_VALUE, FirestoreConverter } from '@utils';
import { FirestoreAPIClient } from '@utils';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class NoteContentFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<NoteContent> implements NoteContentRemoteRepository {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.noteContent,
			new NoteContentFirestoreConverter()
		);
	}

}

class NoteContentFirestoreConverter implements FirestoreConverter<NoteContent> {

	toFirestore(note: NoteContent): Record<keyof NoteContent, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof NoteContent, FIRESTORE_VALUE>;
		fields[ 'name' ] = { stringValue: note.name };
		fields[ 'content' ] = { stringValue: note.content };
		return fields;

	}

	fromFirestore(incoming: NoteContent): NoteContent {

		// validate incoming
		let { id, name, content } = incoming;
		if (!id)
			throw new Error(`Firestore NoteContent: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore NoteContent: invalid 'name' value`);

		if (!content)
			throw new Error(`Firestore NoteContent: invalid 'content' value`);

		const validated: NoteContent = {

			id,
			name,
			content

		};
		return validated;

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
