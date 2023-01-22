import { KnobaTable, ID } from 'blueprints/constants';
import { ISyncData, IFast } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class FastsTable extends AbstractDexieTable<IFast> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.fasts);
	}

	protected searchFilter(term: string, item: ISyncData<IFast>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.goal}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<IFast>): IFast {

		const instance: IFast = {

			id,
			start: new Date(),
			goal: 23

		};
		return {

			...instance,
			...item

		} as IFast;

	}

}
