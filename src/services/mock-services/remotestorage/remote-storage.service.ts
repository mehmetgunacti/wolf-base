import { Entity, RemoteRepositoryService, EntityType } from '@lib';
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository, NotesRemoteRepository, ProjectsRemoteRepository, QuizEntriesRemoteRepository, QuotesRemoteRepository } from 'lib/repositories/remote';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';
import { MockBookmarksCollection } from "./collections/bookmarks.collection";
import { MockNoteContentContentCollection } from './collections/note-content.collection';
import { MockNotesCollection } from './collections/notes.collection';
import { MockWordsCollection } from './collections/words.collection';
import { MockProjectsCollection } from './collections/projects.collection';
import { MockQuizEntriesCollection } from './collections/quiz-entries.collection';
import { MockQuotesCollection } from './collections/quotes.collection';
import { TasksRemoteRepository } from 'lib/repositories/remote/project-task-remote.repository';
import { MockTasksCollection } from './collections/tasks.collection';

export class MockRemoteRepositoryService implements RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository = new MockBookmarksCollection();
	notes: NotesRemoteRepository = new MockNotesCollection();
	noteContent: NoteContentRemoteRepository = new MockNoteContentContentCollection();
	words: WordsRemoteRepository = new MockWordsCollection();
	projects: ProjectsRemoteRepository = new MockProjectsCollection();
	quizEntries: QuizEntriesRemoteRepository = new MockQuizEntriesCollection();
	quotes: QuotesRemoteRepository = new MockQuotesCollection();
	tasks: TasksRemoteRepository = new MockTasksCollection();


	getRepository(entity: EntityType): EntityRemoteRepository<Entity> {

		switch (entity) {

			case EntityType.bookmark: return this.bookmarks;
			case EntityType.note: return this.notes;
			case EntityType.noteContent: return this.noteContent;
			case EntityType.word: return this.words;
			case EntityType.project: return this.projects;
			case EntityType.quizEntry: return this.projects;
			case EntityType.quote: return this.projects;
			case EntityType.task: return this.tasks;

		}
		throw Error('Unknown entity');

	}

}
