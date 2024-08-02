import { RemoteData, RemoteMetadata, Task, UUID } from '@lib';
import { TasksRemoteRepository } from 'lib/repositories/remote/project-task-remote.repository';
import { Observable, delay, map, of } from 'rxjs';

const SLEEP = 20;

export class MockTasksCollection implements TasksRemoteRepository {

	private tasks: Record<string, RemoteData<Task>> = {};
	private tasks_trash: Record<string, RemoteData<Task>> = {};

	download(id: string): Observable<RemoteData<Task> | null> {

		return of(this.tasks[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<Task>[]> {

		if (ids)
			return of(Object.keys(this.tasks).filter(id => ids.includes(id)).map(id => this.tasks[id])).pipe(delay(SLEEP));

		return of(Object.values(this.tasks)).pipe(delay(SLEEP));

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const item = this.tasks[id];
		if (item)
			return of(item.metaData).pipe(delay(SLEEP));

		return of(null).pipe(delay(SLEEP));

	}

	upload(item: Task): Observable<RemoteMetadata> {

		const current = this.tasks[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metadata: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Task> = {

			metaData: metadata,
			entity: item,

		};
		this.tasks[item.id] = remoteData;
		return of(remoteData.metaData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.tasks[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<UUID | null> {


		const b = this.tasks[id];
		if (b) {
			this.tasks_trash[id] = b;
			this.delete(id);
			return of(id);
		}
		return of(null);

	}

	trash(item: Task): Observable<RemoteData<Task>> {

		const metaData: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Task> = {

			metaData,
			entity: item,

		};
		this.tasks_trash[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

}

export class VoidTasksCollection implements TasksRemoteRepository {

	upload(item: Task): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Task> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Task>[]> {
		throw new Error('Method not implemented.');
	}
	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error('Method not implemented.');
	}
	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Observable<void> {
		throw new Error('Method not implemented.');
	}
	trash(item: Task): Observable<RemoteData<Task>> {
		throw new Error('Method not implemented.');
	}

}
