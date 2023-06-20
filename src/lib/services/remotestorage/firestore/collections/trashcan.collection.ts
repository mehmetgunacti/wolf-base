import { RemoteCollection } from 'lib/constants/remote.constant';
import { Trash } from 'lib/models';
import { TrashcanCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreCreateURL, FirestoreDocument } from 'lib/utils/firestore/firestore.model';
import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { TrashFirestoreConverter } from '../converter/trash.converter';
import { environment } from 'environments/environment';

export class TrashcanFirestoreCollection implements TrashcanCollection {

	protected apiKey = environment.firebase.apiKey;
	protected baseURL = environment.firebase.baseURL;
	protected projectId = environment.firebase.projectId;
	protected remoteCollection: RemoteCollection = RemoteCollection.trashcan;
	private converter = new TrashFirestoreConverter();

	constructor(private firestore: FirestoreTool) { }

	async put(item: Trash): Promise<void> {

		const url = new FirestoreCreateURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			item.id
		);
		const requestBody: FirestoreDocument<Trash> = { fields: this.converter.toFirestore(item) };
		await this.firestore.create(url, requestBody);

	}

}
