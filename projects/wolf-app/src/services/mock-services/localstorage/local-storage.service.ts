import { Entity, LocalRepositoryNames, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository } from 'lib/repositories/local';
import { MockBookmarksLocalRepositoryImpl, MockConfigurationLocalRepositoryImpl, MockKBContentsLocalRepositoryImpl, MockKBEntriesLocalRepositoryImpl, MockLogsLocalRepositoryImpl } from "./tables";

export class MockLocalRepositoryService implements LocalRepositoryService {

	bookmarks: BookmarksLocalRepository = new MockBookmarksLocalRepositoryImpl();
	kbEntries: KBEntriesLocalRepository = new MockKBEntriesLocalRepositoryImpl();
	kbContents: KBContentsLocalRepository = new MockKBContentsLocalRepositoryImpl();
	configuration: ConfigurationLocalRepository = new MockConfigurationLocalRepositoryImpl();
	logs: LogsLocalRepository = new MockLogsLocalRepositoryImpl();

	getRepository(entity: WolfEntity): EntityLocalRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmark: return this.bookmarks;

		}

		throw Error('Unknown entity');

	}

	async dump(tablename: LocalRepositoryNames): Promise<Record<string, string>> {

		return {};

	}

}
