import { BookmarksRepository, ConfigurationRepository, KBContentsRepository, KBEntriesRepository, LocalRepositoryService, LocalRepositoryNames, LogsRepository, Entity, EntityRepository, WolfEntity } from '@lib';
import { MockBookmarksRepositoryImpl, MockConfigurationRepositoryImpl, MockKBContentsRepositoryImpl, MockKBEntriesRepositoryImpl, MockLogsRepositoryImpl } from "./tables";

export class MockLocalStorageService implements LocalRepositoryService {

	bookmarks: BookmarksRepository = new MockBookmarksRepositoryImpl();
	kbEntries: KBEntriesRepository = new MockKBEntriesRepositoryImpl();
	kbContents: KBContentsRepository = new MockKBContentsRepositoryImpl();
	configuration: ConfigurationRepository = new MockConfigurationRepositoryImpl();
	logs: LogsRepository = new MockLogsRepositoryImpl();

	getRepository(entity: WolfEntity): EntityRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmarks: return this.bookmarks;

		}

		throw Error('Unknown entity');

	}

	async dump(tablename: LocalRepositoryNames): Promise<Record<string, string>> {

		return {};

	}

}
