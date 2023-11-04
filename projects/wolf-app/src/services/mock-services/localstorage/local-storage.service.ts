import { BookmarksRepository, ConfigurationRepository, KBContentsRepository, KBEntriesRepository, LocalStorageService, LocalRepositoryNames, LogsRepository } from '@lib';
import { MockBookmarksRepositoryImpl, MockConfigurationRepositoryImpl, MockKBContentsRepositoryImpl, MockKBEntriesRepositoryImpl, MockLogsRepositoryImpl } from "./tables";

export class MockLocalStorageService implements LocalStorageService {

	bookmarks: BookmarksRepository = new MockBookmarksRepositoryImpl();
	kbEntries: KBEntriesRepository = new MockKBEntriesRepositoryImpl();
	kbContents: KBContentsRepository = new MockKBContentsRepositoryImpl();
	configuration: ConfigurationRepository = new MockConfigurationRepositoryImpl();
	logs: LogsRepository = new MockLogsRepositoryImpl();

	async dump(tablename: LocalRepositoryNames): Promise<Record<string, string>> {

		return {};

	}

}
