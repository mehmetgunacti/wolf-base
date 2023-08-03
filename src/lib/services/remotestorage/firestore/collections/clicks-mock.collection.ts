import { Click } from 'lib/models/bookmark.model';
import { ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';

export class MockClicksFirestoreCollection implements ClicksCollection {

	private clicks: Map<string, number> = new Map();

	increase(id: string, amount: number): Promise<number> {

		let current = this.clicks.get(id) ?? 0;
		current += amount;
		this.clicks.set(id, current);
		return Promise.resolve(current);

	}

	downloadMany(): Promise<Click[]> {

		const clicks = Array.from(this.clicks.entries()).map(click => ({

			id: click[0],
			current: 0,
			total: click[1]

		} as Click));
		return Promise.resolve(clicks);

	}

}