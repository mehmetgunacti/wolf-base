import { BookmarksTable, ClicksTable, ConfigurationTable, LocalStorageService, LogsTable, WolfBaseTableName } from "lib";
import { MockBookmarksTableImpl, MockClicksTableImpl, MockConfigurationTableImpl, MockLogsTableImpl } from "./tables";

export class MockLocalStorageService implements LocalStorageService {

	bookmarks: BookmarksTable = new MockBookmarksTableImpl();
	clicks: ClicksTable = new MockClicksTableImpl();
	configuration: ConfigurationTable = new MockConfigurationTableImpl();
	logs: LogsTable = new MockLogsTableImpl();

	async dump(tablename: WolfBaseTableName): Promise<Record<string, string>> {

        return {};

    }

}