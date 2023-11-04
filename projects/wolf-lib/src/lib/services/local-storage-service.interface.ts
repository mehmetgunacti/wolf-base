import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { BookmarksRepository, ConfigurationRepository, KBContentsRepository, KBEntriesRepository, LogsRepository } from 'lib/repositories';

export interface LocalStorageService {

	// entity tables
	bookmarks: BookmarksRepository;
	kbEntries: KBEntriesRepository;
	kbContents: KBContentsRepository;

	// non-entity tables
	configuration: ConfigurationRepository;
	logs: LogsRepository;

	dump(tablename: LocalRepositoryNames): Promise<Record<string, string>>;

}
