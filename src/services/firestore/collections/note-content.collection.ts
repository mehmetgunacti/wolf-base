import { AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { NoteContent } from '@models/note.model';
import { NoteContentRemoteRepository } from '@repositories/remote/note-content-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreConverter } from '@utils/firestore-rest-client/firestore.model';
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
