import { BookmarksTable, ConfigurationTable, KBContentsTable, KBEntriesTable, LocalStorageService, LocalTableNames, LogsTable } from '@lib';
import { MockBookmarksTableImpl, MockConfigurationTableImpl, MockKBContentsTableImpl, MockKBEntriesTableImpl, MockLogsTableImpl } from "./tables";

export class MockLocalStorageService implements LocalStorageService {

	bookmarks: BookmarksTable = new MockBookmarksTableImpl();
	kbEntries: KBEntriesTable = new MockKBEntriesTableImpl();
	kbContents: KBContentsTable = new MockKBContentsTableImpl();
	configuration: ConfigurationTable = new MockConfigurationTableImpl();
	logs: LogsTable = new MockLogsTableImpl();

	async dump(tablename: LocalTableNames): Promise<Record<string, string>> {

		return {};

	}

}
