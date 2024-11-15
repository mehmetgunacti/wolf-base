import { Task } from '@models/project.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { TasksRemoteRepository } from '@repositories/remote/project-task-remote.repository';
import { Observable } from 'rxjs';

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
