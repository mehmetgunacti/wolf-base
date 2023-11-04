import { WolfEntity } from 'lib/constants';
import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { Entity } from 'lib/models';
import { BookmarksRepository, ConfigurationRepository, EntityRepository, KBContentsRepository, KBEntriesRepository, LogsRepository } from 'lib/repositories';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksRepository;
	kbEntries: KBEntriesRepository;
	kbContents: KBContentsRepository;

	// non-entity tables
	configuration: ConfigurationRepository;
	logs: LogsRepository;

	getRepository(entity: WolfEntity): EntityRepository<Entity>;

	dump(tablename: LocalRepositoryNames): Promise<Record<string, string>>;

}
