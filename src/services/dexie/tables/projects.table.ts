import { AppEntities, ProjectStatus, UUID } from '@constants';
import { Project } from '@models';
import { ProjectLocalRepository } from '@repositories';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieProjectsRepositoryImpl extends EntityLocalRepositoryImpl<Project> implements ProjectLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.project);
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
