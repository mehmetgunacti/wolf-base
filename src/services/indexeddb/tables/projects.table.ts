import { AppEntities, DbStore, ProjectStatus, UUID } from '@constants';
import { IndexedDb } from '@libServices';
import { Project } from '@models';
import { ProjectLocalRepository } from '@repositories';
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
