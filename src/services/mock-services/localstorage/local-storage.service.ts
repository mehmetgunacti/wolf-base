import { BookmarksTable, ConfigurationTable, LocalStorageService, LogsTable, WolfBaseTableName } from "lib";
import { MockBookmarksTableImpl, MockConfigurationTableImpl, MockLogsTableImpl } from "./tables";

export class MockLocalStorageService implements LocalStorageService {

	bookmarks: BookmarksTable = new MockBookmarksTableImpl();
	configuration: ConfigurationTable = new MockConfigurationTableImpl();
	logs: LogsTable = new MockLogsTableImpl();

	async dump(tablename: WolfBaseTableName): Promise<Record<string, string>> {

        return {};

    }

}