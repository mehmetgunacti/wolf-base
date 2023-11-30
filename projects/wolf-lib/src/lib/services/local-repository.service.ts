import { EntityName } from 'lib/constants';
import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { Entity } from 'lib/models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository } from 'lib/repositories/local';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	kbEntries: KBEntriesLocalRepository;
	kbContents: KBContentsLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository(entityName: EntityName): EntityLocalRepository<Entity>;

	dump(tablename: LocalRepositoryNames): Promise<Record<string, string>>;

}
