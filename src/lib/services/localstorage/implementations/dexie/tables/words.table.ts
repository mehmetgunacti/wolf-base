import { KnobaTable, ID } from 'blueprints/constants';
import { ISyncData, IWord } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';

export class WordsTable extends AbstractDexieTable<IWord> {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.words);
	}

	protected searchFilter(term: string, item: ISyncData<IWord>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.term} ${item.data.definitions} ${item.data.tags}`).toLocaleLowerCase()
		);

	}

	protected newInstance(id: ID, item: Partial<IWord>): IWord {

		const instance: IWord = {

			id,
			term: '',
			language: '',
			pronunciation: '',
			definitions: [],
			tags: []

		};
		return {

			...instance,
			...item

		} as IWord;

	}

}
