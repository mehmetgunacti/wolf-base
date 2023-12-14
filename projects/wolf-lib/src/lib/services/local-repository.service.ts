import { EntityName } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	kbEntries: KBEntriesLocalRepository;
	kbContents: KBContentsLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T>;

}
