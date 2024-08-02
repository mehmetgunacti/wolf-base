import { Entity, RemoteRepositoryService, WolfEntity } from '@lib';
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


	getRepository(entity: WolfEntity): EntityRemoteRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmark: return this.bookmarks;
			case WolfEntity.note: return this.notes;
			case WolfEntity.note_content: return this.noteContent;
			case WolfEntity.word: return this.words;
			case WolfEntity.project: return this.projects;
			case WolfEntity.quizEntry: return this.projects;
			case WolfEntity.quote: return this.projects;
			case WolfEntity.task: return this.tasks;

		}
		throw Error('Unknown entity');

	}

}
