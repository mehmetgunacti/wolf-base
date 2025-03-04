import { Project } from '@models/project.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { ProjectsRemoteRepository } from '@repositories/remote/project-remote.repository';
import { Observable } from 'rxjs';

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
