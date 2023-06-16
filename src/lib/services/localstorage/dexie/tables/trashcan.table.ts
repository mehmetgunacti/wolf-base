import { UUID } from 'lib/constants';
import { Trash } from 'lib/models';
import { TrashcanTable } from 'lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';

export class TrashcanTableImpl implements TrashcanTable {

	constructor(protected db: WolfBaseDB) { }

	async get(id: UUID): Promise<Trash | undefined> {

		return await this.db.trashcan.get(id);

	}

	async put(item: Trash): Promise<void> {

		await this.db.trashcan.put(item);

	}

	async delete(id: UUID): Promise<void> {

		await this.db.trashcan.delete(id);

	}

	async list(filterFn?: (t: Trash) => boolean): Promise<Trash[]> {

		if (filterFn)
			return await this.db.trashcan.toCollection().filter(filterFn).toArray();
		return await this.db.trashcan.toArray();

	}

}
