import { EntityName } from 'lib/constants';
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

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T>;

}
