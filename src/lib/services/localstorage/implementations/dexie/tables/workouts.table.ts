import { KnobaTable, ID } from 'blueprints/constants';
import { ISyncData, IWorkout } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class WorkoutsTable extends AbstractDexieTable<IWorkout> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.workouts);
	}

	protected searchFilter(term: string, item: ISyncData<IWorkout>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.count}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<IWorkout>): IWorkout {

		const instance: IWorkout = {

			id,
			count: 0

		};
		return {

			...instance,
			...item

		} as IWorkout;

	}

}
