import { UUID } from 'lib/constants';
import { Click } from 'lib/models/bookmark.model';
import { ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { Observable, of } from 'rxjs';

export class MockClicksFirestoreCollection implements ClicksCollection {

	private clicks: Record<UUID, number> = {};

	increase(id: string, amount: number): Observable<number> {

		let current = this.clicks[id] ?? 0;
		current += amount;
		this.clicks[id] = current;
		return of(current);

	}

	downloadMany(): Observable<Click[]> {

		return of(Object.keys(this.clicks).map(id => ({ id, current: 0, total: this.clicks[id] })));

	}

}