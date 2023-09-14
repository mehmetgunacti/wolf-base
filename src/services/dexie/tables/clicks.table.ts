import { ClicksTable } from "lib";
import { LogCategory, UUID, WolfBaseTableName } from "lib/constants";
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

	async listClicked(): Promise<Click[]> {

		return await this.db.clicks.where('current').above(0).toArray();

	}

	async storeClicks(items: Click[]): Promise<number> {

		// remove obsolete click objects
		const bookmarkIds = new Set(await this.db.bookmarks.toCollection().primaryKeys() as UUID[]);
		const matching = items.filter(({ id }) => bookmarkIds.has(id));
		await this.db.transaction('rw', [WolfBaseTableName.bookmarks_clicks, WolfBaseTableName.logs], async () => {

			await this.db.clicks.clear();
			await this.db.clicks.bulkAdd(matching);

			// add log
			await this.db.logs.add({
				category: LogCategory.store_clicks,
				date: new Date().toISOString(),
				message: `${items.length} downloaded, ${matching.length} stored`
			});

		});
		return items.length;

	}

	async listAll(): Promise<Click[]> {

		return await this.db.clicks.toArray();

	}

}