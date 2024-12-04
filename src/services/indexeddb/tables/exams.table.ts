import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Exam } from '@models/test-suite.model';
import { ExamsLocalRepository } from '@repositories/local/exam.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';
import { emptyNameBase } from '@models/id-base.model';

export class ExamsLocalRepositoryImpl extends EntityLocalRepositoryImpl<Exam> implements ExamsLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.exams,
			DbStore.exams_sync,
			DbStore.exams_remote,
			DbStore.exams_trash,
			AppEntities.exam.label
		);
	}

	protected override newItemFromPartial(item: Partial<Exam>): Exam {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Exam>): Exam {

		const instance: Exam = {

			id,
			testSuite: emptyNameBase(),
			name: '',
			description: null,
			questions: []

		};
		return { ...instance, ...item, id } as Exam;

	}

}
