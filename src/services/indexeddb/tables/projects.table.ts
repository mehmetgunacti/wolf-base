import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { ProjectStatus } from '@constants/project.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { Project } from '@models/project.model';
import { ProjectLocalRepository } from '@repositories/local/project.repository';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class ProjectsLocalRepositoryImpl extends EntityLocalRepositoryImpl<Project> implements ProjectLocalRepository {

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

	protected override newItemFromPartial(item: Partial<Project>): Project {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Project>): Project {

		const instance: Project = {

			id,
			name: '',
			description: null,
			tasks: [],
			status: ProjectStatus.ongoing,
			start: new Date().toISOString(),
			end: null

		};
		return { ...instance, ...item, id } as Project;

	}

}
