import { Task } from '@models/project.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { TasksRemoteRepository } from '@repositories/remote/project-task-remote.repository';
import { Observable } from 'rxjs';

export class VoidTasksCollection implements TasksRemoteRepository {

	upload(item: Task): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Task> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Task>[]> {
		throw new Error('Firestore configuration missing');
	}
	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error('Firestore configuration missing');
	}
	delete(id: string): Observable<void> {
		throw new Error('Firestore configuration missing');
	}
	trash(item: Task): Observable<RemoteData<Task>> {
		throw new Error('Firestore configuration missing');
	}

}
