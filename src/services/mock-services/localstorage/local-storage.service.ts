import { Entity, EntityType, LocalRepositoryNames, LocalRepositoryService } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, ProjectLocalRepository, QuoteLocalRepository, WordLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { MockBookmarksLocalRepositoryImpl, MockConfigurationLocalRepositoryImpl, MockLogsLocalRepositoryImpl, MockProjectsLocalRepositoryImpl, MockQuizEntryLocalRepositoryImpl, MockQuotesLocalRepositoryImpl } from './tables';
import { MockNoteContentLocalRepositoryImpl } from './tables/note-content.table';
import { MockNotesLocalRepositoryImpl } from './tables/notes.table';
import { MockTasksLocalRepositoryImpl } from './tables/tasks.table';
import { MockWordsLocalRepositoryImpl } from './tables/words.table';


export class MockLocalRepositoryService implements LocalRepositoryService {

	bookmarks: BookmarksLocalRepository = new MockBookmarksLocalRepositoryImpl();
	notes: NotesLocalRepository = new MockNotesLocalRepositoryImpl();
	noteContent: NoteContentLocalRepository = new MockNoteContentLocalRepositoryImpl();
	words: WordLocalRepository = new MockWordsLocalRepositoryImpl();
	quizEntries: QuizEntryLocalRepository = new MockQuizEntryLocalRepositoryImpl();
	quotes: QuoteLocalRepository = new MockQuotesLocalRepositoryImpl();
	configuration: ConfigurationLocalRepository = new MockConfigurationLocalRepositoryImpl();
	logs: LogsLocalRepository = new MockLogsLocalRepositoryImpl();
	projects: ProjectLocalRepository = new MockProjectsLocalRepositoryImpl();
	tasks: TaskLocalRepository = new MockTasksLocalRepositoryImpl();

	getRepository<T extends Entity>(entityType: EntityType): EntityLocalRepository<T> {

		switch (entityType) {

			case EntityType.bookmark: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case EntityType.note: return this.notes as unknown as EntityLocalRepository<T>;
			case EntityType.noteContent: return this.noteContent as unknown as EntityLocalRepository<T>;
			case EntityType.word: return this.words as unknown as EntityLocalRepository<T>;

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
