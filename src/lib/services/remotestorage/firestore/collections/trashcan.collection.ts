import { RemoteCollection } from 'lib/constants/remote.constant';
import { Trash } from 'lib/models';
import { TrashcanCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreDocument } from 'lib/utils/firestore/firestore.model';
import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { TrashFirestoreConverter } from '../converter/trash.converter';

export class TrashcanFirestoreCollection implements TrashcanCollection {

	private converter = new TrashFirestoreConverter();

	constructor(private firestore: FirestoreTool) { }

	async put(item: Trash): Promise<void> {

		const url = this.firestore.createURL({
			collection: RemoteCollection.trashcan,
			queryParameters: { documentId: item.id }
		});
		const requestBody: FirestoreDocument<Trash> = { fields: this.converter.toFirestore(item) };
		await this.firestore.create(url, requestBody);

	}

}
