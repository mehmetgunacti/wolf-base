import { UUID, WolfBaseTableName } from "lib/constants";
import { Click } from "lib/models";
import { WolfBaseDB } from "../wolfbase.database";
import { ClicksTable } from "lib";

export class ClicksTableImpl implements ClicksTable {

	constructor(private db: WolfBaseDB) { }

	async click(id: UUID): Promise<void> {

		// try to increment value (update)
		const affected = await this.db.clicks
			.where({ id })
			.modify((click: Click): void => {

				click.total = (click.total ?? 0) + 1;
				click.current = (click.current ?? 0) + 1;

			});

		// if no object found, create one
		if (affected !== 1)
			await this.db.clicks.add({
				id,
				total: 1,
				current: 1
			});

	}

	async clicked(): Promise<Click[]> {

		return await this.db.clicks.where('current').above(0).toArray();

	}

	async put(item: Click): Promise<void> {

		await this.db.clicks.put(item);

	}

	async putAll(items: Click[]): Promise<void> {

		await this.db.transaction('rw', WolfBaseTableName.bookmarks_clicks, async () => {

			await this.db.clicks.clear();
			await this.db.clicks.bulkAdd(items);


		});

	}

	async list(): Promise<Click[]> {

		return await this.db.clicks.toArray();

	}

}

export class MockClicksTableImpl implements ClicksTable {

	private bookmarks_clicks: Map<string, Click> = new Map();

	async click(id: string): Promise<void> {

		const click = this.bookmarks_clicks.get(id);
		if (click) {

			click.current += 1;
			click.total += 1;

		} else

			this.bookmarks_clicks.set(id, {

				id,
				current: 1,
				total: 1

			});

	}

	async clicked(): Promise<Click[]> {

		const clicks = Array.from(this.bookmarks_clicks.values());
		return clicks.filter(c => c.current > 0);

	}

	async put(item: Click): Promise<void> {

		this.bookmarks_clicks.set(item.id, item);

	}

	async putAll(items: Click[]): Promise<void> {

		for (const item of items)
			this.bookmarks_clicks.set(item.id, item);

	}

	async list(): Promise<Click[]> {

		return Array.from(this.bookmarks_clicks.values());

	}

}