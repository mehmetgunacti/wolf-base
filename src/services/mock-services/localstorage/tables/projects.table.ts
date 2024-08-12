import { Metadata, RemoteData, RemoteMetadata, SyncData, UUID, Project, sleep, ProjectStatus } from '@lib';
import { ProjectLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockProjectsLocalRepositoryImpl implements ProjectLocalRepository {

	private projects: Map<string, Project> = new Map();
	private projects_sync: Map<string, SyncData> = new Map();
	private projects_remote: Map<string, RemoteMetadata> = new Map();
	private projects_trash: Project[] = [];

	async getEntity(id: string): Promise<Project | null> {

		await sleep(SLEEP);
		return this.projects.get(id) ?? null;

	}

	async create(item: Partial<Project>): Promise<Project> {

		await sleep(SLEEP);
		const project: Project = {

			name: '',
			status: ProjectStatus.ongoing,
			start: new Date().toISOString(),
			description: null,
			end: null,
			tasks: [],
			...item,
			id: uuidv4()

		};
		this.projects.set(project.id, project);
		return project;

	}

	async put(item: RemoteData<Project>): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData = {

			id: item.metaData.id,
			name: item.metaData.name,
			createTime: item.metaData.createTime,
			updateTime: item.metaData.updateTime,
			updated: false,
			deleted: false,
			error: null

		}

		this.projects.set(item.metaData.id, item.entity);
		this.projects_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<Project>): Promise<number> {

		await sleep(SLEEP);
		const project: Project | undefined = this.projects.get(id);
		if (!project)
			return 0;

		this.projects.set(id, { ...project, ...item });

		const sync: SyncData | undefined = this.projects_sync.get(id);
		if (sync)
			this.projects_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.projects_sync.get(id);
		if (!syncData)
			throw new Error(`Project syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<Project[]> {

		await sleep(SLEEP);
		return Array.from(this.projects.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.projects.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.projects_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.projects_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const projectIds = Array.from(this.projects.keys());
		const syncIds = Array.from(this.projects_sync.keys());
		return projectIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.projects_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.projects_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const project: Project | undefined = this.projects.get(id);
		if (project) {

			this.projects_trash.push(project);
			this.projects.delete(id);
			const sync: SyncData | undefined = this.projects_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<Project[]> {

		await sleep(300);
		return Array.from(this.projects_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.projects.get(id);
		if (item)
			this.projects_trash.push(item);
		this.projects.delete(id);
		this.projects_sync.delete(id);
		this.projects_remote.delete(id);
		return id;

	}

	search(term: string): Promise<Project[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Project[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.projects_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.projects_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.projects_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.projects_remote.clear();
		data.forEach(d => this.projects_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<Project>): Promise<RemoteData<Project>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<Project>[]): Promise<number> {

		await sleep(SLEEP);
		items.forEach(item => this.put(item));
		return items.length;

	}

	async storeMetadata(data: Metadata): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData = {

			id: data.id,
			name: data.name,
			createTime: data.createTime,
			updateTime: data.updateTime,
			updated: false,
			deleted: false,
			error: null

		}

		this.projects_sync.set(data.id, syncData);
		this.projects_remote.set(data.id, data);

	}

}
