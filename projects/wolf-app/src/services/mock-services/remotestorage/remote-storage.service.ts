import { Entity, RemoteRepositoryService, WolfEntity } from '@lib';
import { BookmarksRemoteRepository, EntityRemoteRepository } from 'lib/repositories/remote';
import { MockBookmarksCollection } from "./collections/bookmarks.collection";

export class MockRemoteRepositoryService implements RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository = new MockBookmarksCollection();

	getRepository(entity: WolfEntity): EntityRemoteRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmark: return this.bookmarks;

		}
		throw Error('Unknown entity');

	}

}
