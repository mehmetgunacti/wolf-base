import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { TestSuite } from '@models/test-suite.model';
import { TestSuiteLocalRepository } from '@repositories/local/test-suite.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class TestSuitesLocalRepositoryImpl extends EntityLocalRepositoryImpl<TestSuite> implements TestSuiteLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.projects,
			DbStore.projects_sync,
			DbStore.projects_remote,
			DbStore.projects_trash,
			AppEntities.project.label
		);
	}

	protected override newItemFromPartial(item: Partial<TestSuite>): TestSuite {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<TestSuite>): TestSuite {

		const instance: TestSuite = {

			id,
			name: '',
			tests: []

		};
		return { ...instance, ...item, id } as TestSuite;

	}

}
