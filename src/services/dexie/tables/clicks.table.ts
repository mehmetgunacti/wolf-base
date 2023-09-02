import { ClicksTable } from "lib";
import { UUID, WolfBaseTableName } from "lib/constants";
import { Click } from "lib/models";
import { WolfBaseDB } from "../wolfbase.database";

export class DexieClicksTableImpl implements ClicksTable {

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