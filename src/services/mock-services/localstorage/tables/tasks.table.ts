import { emptyNameBase, Metadata, RemoteData, RemoteMetadata, sleep, SyncData, Task, TaskPriority, TaskState, UUID } from '@lib';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockTasksLocalRepositoryImpl implements TaskLocalRepository {

	private tasks: Map<string, Task> = new Map();
	private tasks_sync: Map<string, SyncData> = new Map();
	private tasks_remote: Map<string, RemoteMetadata> = new Map();
	private tasks_trash: Task[] = [];

	async getEntity(id: string): Promise<Task | null> {

		await sleep(SLEEP);
		return this.tasks.get(id) ?? null;

	}

	async create(item: Partial<Task>): Promise<Task> {

		await sleep(SLEEP);
		const task: Task = {

			name: '',
			project: emptyNameBase(),
			description: null,
			status: TaskState.ongoing,
			priority: TaskPriority.normal,
			start: new Date().toISOString(),
			end: null,
			tags: [],
			...item,
			id: uuidv4()

		};
		this.tasks.set(task.id, task);
		return task;

	}

	async put(item: RemoteData<Task>): Promise<void> {

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

		this.tasks.set(item.metaData.id, item.entity);
		this.tasks_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<Task>): Promise<number> {

		await sleep(SLEEP);
		const task: Task | undefined = this.tasks.get(id);
		if (!task)
			return 0;

		this.tasks.set(id, { ...task, ...item });

		const sync: SyncData | undefined = this.tasks_sync.get(id);
		if (sync)
			this.tasks_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.tasks_sync.get(id);
		if (!syncData)
			throw new Error(`Task syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<Task[]> {

		await sleep(SLEEP);
		return Array.from(this.tasks.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.tasks.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.tasks_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.tasks_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const taskIds = Array.from(this.tasks.keys());
		const syncIds = Array.from(this.tasks_sync.keys());
		return taskIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.tasks_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.tasks_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const task: Task | undefined = this.tasks.get(id);
		if (task) {

			this.tasks_trash.push(task);
			this.tasks.delete(id);
			const sync: SyncData | undefined = this.tasks_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<Task[]> {

		await sleep(300);
		return Array.from(this.tasks_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.tasks.get(id);
		if (item)
			this.tasks_trash.push(item);
		this.tasks.delete(id);
		this.tasks_sync.delete(id);
		this.tasks_remote.delete(id);
		return id;

	}

	search(term: string): Promise<Task[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Task[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.tasks_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.tasks_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.tasks_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.tasks_remote.clear();
		data.forEach(d => this.tasks_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<Task>): Promise<RemoteData<Task>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<Task>[]): Promise<number> {

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

		this.tasks_sync.set(data.id, syncData);
		this.tasks_remote.set(data.id, data);

	}

}
