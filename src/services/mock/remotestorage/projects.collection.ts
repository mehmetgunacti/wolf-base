import { Project } from '@models/project.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { ProjectsRemoteRepository } from '@repositories/remote/project-remote.repository';
import { Observable } from 'rxjs';

export class VoidProjectsCollection implements ProjectsRemoteRepository {

	upload(item: Project): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Project> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Project>[]> {
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
	trash(item: Project): Observable<RemoteData<Project>> {
		throw new Error('Firestore configuration missing');
	}

}
