import { NameBase, Project, ProjectStatus, WolfEntity } from '@lib';
import { produce } from 'immer';
import { UUID } from 'lib/constants/common.constant';
import { ProjectLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieProjectsRepositoryImpl extends EntityLocalRepositoryImpl<Project> implements ProjectLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.project);
	}

	protected override newItemFromPartial(item: Partial<Project>): Project {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Project>): Project {

		const taskGroups: NameBase[] = item.taskGroups ?? [];
		if (taskGroups.length < 1)
			throw Error('Create `Project`: taskGroups array is empty')

		const updated: Partial<Project> = produce(

			item,
			draft => {

				draft.taskGroups?.filter(tg => !tg.id).forEach(tg => tg.id = uuidv4())

			}

		);

		const instance: Project = {

			id,
			name: '',
			description: null,
			taskGroups: [
				{
					id: uuidv4(),
					name: 'default'
				}
			],
			status: ProjectStatus.ongoing,
			start: new Date().toISOString(),
			end: null

		};
		return { ...instance, ...updated, id } as Project;

	}

	override async update(id: UUID, item: Partial<Project>): Promise<number> {

		// normally, entity IDs are set during entity creation
		// NameBase is part of Project, but is not an Entity itself
		// new taskGroups can be added to 'taskGroups' array in Project update form
		// => IDs have to be set manually during Project update
		const updated: Partial<Project> = produce(
			item,
			draft => {

				draft.taskGroups?.filter(tg => !tg.id).forEach(tg => tg.id = uuidv4())

			}
		);
		return await super.update(id, updated);

	}

}
