import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { emptyNameBase } from '@models/id-base.model';
import { Session } from '@models/test-suite.model';
import { SessionsLocalRepository } from '@repositories/local/session.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class SessionsLocalRepositoryImpl extends EntityLocalRepositoryImpl<Session> implements SessionsLocalRepository {

	constructor(db: IndexedDb) {
		super(
			db,
			DbStore.sessions,
			DbStore.sessions_sync,
			DbStore.sessions_remote,
			DbStore.sessions_trash,
			AppEntities.session.label
		);
	}

	protected override newItemFromPartial(item: Partial<Session>): Session {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Session>): Session {

		const instance: Session = {

			id,
			name: '',
			exam: emptyNameBase(),
			answers: [],
			start: new Date().toISOString(),
			end: null

		};
		return { ...instance, ...item, id } as Session;

	}

}
