import { Entity, EntityName, LocalRepositoryNames, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, WordLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';
import { MockBookmarksLocalRepositoryImpl, MockConfigurationLocalRepositoryImpl, MockLogsLocalRepositoryImpl } from './tables';
import { MockNoteContentLocalRepositoryImpl } from './tables/note-content.table';
import { MockNotesLocalRepositoryImpl } from './tables/notes.table';
import { MockWordsLocalRepositoryImpl } from './tables/words.table';

export class MockLocalRepositoryService implements LocalRepositoryService {

	bookmarks: BookmarksLocalRepository = new MockBookmarksLocalRepositoryImpl();
	notes: NotesLocalRepository = new MockNotesLocalRepositoryImpl();
	noteContent: NoteContentLocalRepository = new MockNoteContentLocalRepositoryImpl();
	words: WordLocalRepository = new MockWordsLocalRepositoryImpl();
	configuration: ConfigurationLocalRepository = new MockConfigurationLocalRepositoryImpl();
	logs: LogsLocalRepository = new MockLogsLocalRepositoryImpl();

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T> {

		switch (entityName.name) {

			case WolfEntity.bookmark.name: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case WolfEntity.note.name: return this.notes as unknown as EntityLocalRepository<T>;
			case WolfEntity.note_content.name: return this.noteContent as unknown as EntityLocalRepository<T>;
			case WolfEntity.word.name: return this.words as unknown as EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

	dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>> {
		throw new Error('Method not implemented.');
	}

	count(repoName: LocalRepositoryNames): Promise<number> {
		throw new Error('Method not implemented.');
	}

	size(repoName: LocalRepositoryNames): Promise<number> {
		throw new Error('Method not implemented.');
	}

}
