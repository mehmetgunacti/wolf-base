import { UUID, WolfBaseTableName } from "lib/constants";
import { Click } from "lib/models";
import { v4 as uuidv4 } from 'uuid';
import { ClicksTable } from "../../local-storage-table.interface";
import { WolfBaseDB } from "../wolfbase.database";

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
				id: uuidv4(),
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

		await this.db.transaction('rw', WolfBaseTableName.clicks, async () => {

			await this.db.clicks.clear();
			await this.db.clicks.bulkAdd(items);

		})

	}

}