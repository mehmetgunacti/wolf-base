import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Exam } from '@models/test-suite.model';
import { ExamsLocalRepository } from '@repositories/local/exam.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class ExamsLocalRepositoryImpl extends EntityLocalRepositoryImpl<Exam> implements ExamsLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.test_suites,
			DbStore.test_suites_sync,
			DbStore.test_suites_remote,
			DbStore.test_suites_trash,
			AppEntities.testSuite.label
		);
	}

	protected override newItemFromPartial(item: Partial<Exam>): Exam {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Exam>): Exam {

		const instance: Exam = {

			id,
			testSuiteId: '',
			name: '',
			description: null,
			questions: []

		};
		return { ...instance, ...item, id } as Exam;

	}

}
