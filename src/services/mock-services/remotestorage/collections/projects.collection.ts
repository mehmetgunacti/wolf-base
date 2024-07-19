import { Project, RemoteData, RemoteMetadata, UUID } from '@lib';
import { ProjectsRemoteRepository } from 'lib/repositories/remote/project-remote.repository';
import { Observable, delay, map, of } from 'rxjs';

const SLEEP = 20;

export class MockProjectsCollection implements ProjectsRemoteRepository {

	private notes: Record<string, RemoteData<Project>> = {};
	private notes_trash: Record<string, RemoteData<Project>> = {};

	download(id: string): Observable<RemoteData<Project> | null> {

		return of(this.notes[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<Project>[]> {

		if (ids)
			return of(Object.keys(this.notes).filter(id => ids.includes(id)).map(id => this.notes[id])).pipe(delay(SLEEP));

		return of(Object.values(this.notes)).pipe(delay(SLEEP));

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const item = this.notes[id];
		if (item)
			return of(item.metaData).pipe(delay(SLEEP));

		return of(null).pipe(delay(SLEEP));

	}

	upload(item: Project): Observable<RemoteMetadata> {

		const current = this.notes[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metadata: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Project> = {

			metaData: metadata,
			entity: item,

		};
		this.notes[item.id] = remoteData;
		return of(remoteData.metaData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.notes[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<UUID | null> {


		const b = this.notes[id];
		if (b) {
			this.notes_trash[id] = b;
			this.delete(id);
			return of(id);
		}
		return of(null);

	}

	trash(item: Project): Observable<RemoteData<Project>> {

		const metaData: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Project> = {

			metaData,
			entity: item,

		};
		this.notes_trash[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

}

export class VoidProjectsCollection implements ProjectsRemoteRepository {

	upload(item: Project): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Project> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Project>[]> {
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
	trash(item: Project): Observable<RemoteData<Project>> {
		throw new Error('Method not implemented.');
	}

}
