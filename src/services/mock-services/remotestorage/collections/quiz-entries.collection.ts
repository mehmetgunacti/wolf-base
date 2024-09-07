import { QuizEntry, RemoteData, RemoteMetadata, UUID } from '@lib';
import { QuizEntriesRemoteRepository } from 'lib/repositories/remote';
import { Observable, delay, map, of } from 'rxjs';

const SLEEP = 20;

export class MockQuizEntriesCollection implements QuizEntriesRemoteRepository {

	private quizEntries: Record<string, RemoteData<QuizEntry>> = {};
	private quizEntries_trash: Record<string, RemoteData<QuizEntry>> = {};

	download(id: string): Observable<RemoteData<QuizEntry> | null> {

		return of(this.quizEntries[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<QuizEntry>[]> {

		if (ids)
			return of(Object.keys(this.quizEntries).filter(id => ids.includes(id)).map(id => this.quizEntries[id])).pipe(delay(SLEEP));

		return of(Object.values(this.quizEntries)).pipe(delay(SLEEP));

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const item = this.quizEntries[id];
		if (item)
			return of(item.metaData).pipe(delay(SLEEP));

		return of(null).pipe(delay(SLEEP));

	}

	upload(item: QuizEntry): Observable<RemoteMetadata> {

		const current = this.quizEntries[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metadata: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<QuizEntry> = {

			metaData: metadata,
			entity: item,

		};
		this.quizEntries[item.id] = remoteData;
		return of(remoteData.metaData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.quizEntries[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<UUID | null> {


		const b = this.quizEntries[id];
		if (b) {
			this.quizEntries_trash[id] = b;
			this.delete(id);
			return of(id);
		}
		return of(null);

	}

	trash(item: QuizEntry): Observable<RemoteData<QuizEntry>> {

		const metaData: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<QuizEntry> = {

			metaData,
			entity: item,

		};
		this.quizEntries_trash[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

}

export class VoidQuizEntriesCollection implements QuizEntriesRemoteRepository {

	upload(item: QuizEntry): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<QuizEntry> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<QuizEntry>[]> {
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
	trash(item: QuizEntry): Observable<RemoteData<QuizEntry>> {
		throw new Error('Method not implemented.');
	}

}
