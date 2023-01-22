import { KnobaTable, ID } from 'blueprints/constants';
import { INote, ISyncData } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class NotesTable extends AbstractDexieTable<INote> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.notes);
	}

	protected searchFilter(term: string, item: ISyncData<INote>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.title} ${item.data.content} ${item.data.tags}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<INote>): INote {

		const instance: INote = {

			id,
			title: '',
			content: '',
			tags: [],
			backgroundColor: ''

		};
		return {

			...instance,
			...item

		} as INote;

	}

}
