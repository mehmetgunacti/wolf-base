import { WolfEntity } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksRemoteRepository, EntityRemoteRepository } from 'lib/repositories/remote';

export interface RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository;

	getRepository(entity: WolfEntity): EntityRemoteRepository<Entity>;

}
