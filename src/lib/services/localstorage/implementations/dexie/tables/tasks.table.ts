import { KnobaTable, ID } from 'blueprints/constants';
import { ISyncData, ITaskList } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class TasksTable extends AbstractDexieTable<ITaskList> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.tasks);
	}

	protected searchFilter(term: string, item: ISyncData<ITaskList>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.title} ${item.data.tags} ${item.data.tasks}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<ITaskList>): ITaskList {

		const instance: ITaskList = {

			id,
			title: '',
			tasks: [],
			tags: [],
			backgroundColor: ''

		};
		return {

			...instance,
			...item

		} as ITaskList;

	}

}
