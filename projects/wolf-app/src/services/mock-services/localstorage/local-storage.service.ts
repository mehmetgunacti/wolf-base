import { Entity, EntityName, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';
import { MockBookmarksLocalRepositoryImpl, MockConfigurationLocalRepositoryImpl, MockKBContentsLocalRepositoryImpl, MockKBEntriesLocalRepositoryImpl, MockLogsLocalRepositoryImpl } from './tables';
import { MockNotesLocalRepositoryImpl } from './tables/notes.table';

export class MockLocalRepositoryService implements LocalRepositoryService {

	bookmarks: BookmarksLocalRepository = new MockBookmarksLocalRepositoryImpl();
	notes: NotesLocalRepository = new MockNotesLocalRepositoryImpl();
	kbEntries: KBEntriesLocalRepository = new MockKBEntriesLocalRepositoryImpl();
	kbContents: KBContentsLocalRepository = new MockKBContentsLocalRepositoryImpl();
	configuration: ConfigurationLocalRepository = new MockConfigurationLocalRepositoryImpl();
	logs: LogsLocalRepository = new MockLogsLocalRepositoryImpl();

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T> {

		switch (entityName.name) {

			case WolfEntity.bookmark.name: return this.bookmarks as unknown as  EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

}
