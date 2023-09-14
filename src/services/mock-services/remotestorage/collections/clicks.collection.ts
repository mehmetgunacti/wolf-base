import { Click, ClicksCollection, UUID } from "lib";
import { Observable, of } from "rxjs";

export class MockClicksCollection implements ClicksCollection {

	private clicks: Record<UUID, number> = {};

	uploadClicks(clicks: Click[]): Observable<number> {

		for (const click of clicks)
			this.clicks[click.id] += click.current;
		return of(clicks.length);

	}

	increase(id: string, amount: number): Observable<number> {

		let current = this.clicks[id] ?? 0;
		current += amount;
		this.clicks[id] = current;
		return of(current);

	}

	downloadAll(): Observable<Click[]> {

		return of(Object.keys(this.clicks).map(id => ({ id, current: 0, total: this.clicks[id] })));

	}

}