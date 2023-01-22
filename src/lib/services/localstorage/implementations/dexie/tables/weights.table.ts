import { KnobaTable, ID } from 'blueprints/constants';
import { ISyncData, IWeight } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class WeightsTable extends AbstractDexieTable<IWeight> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.weights);
	}

	protected searchFilter(term: string, item: ISyncData<IWeight>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.count}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<IWeight>): IWeight {

		const instance: IWeight = {

			id,
			count: 0

		};
		return {

			...instance,
			...item

		} as IWeight;

	}

}
