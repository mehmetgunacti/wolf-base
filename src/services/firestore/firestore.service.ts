import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { RemoteRepositoryService } from '@libServices/remote-repository.service';
import { FirestoreConfig } from '@models/configuration.model';
import { Entity } from '@models/entity.model';
import { Store } from '@ngrx/store';
import { BookmarksRemoteRepository } from '@repositories/remote/bookmark-remote.repository';
import { EntityRemoteRepository } from '@repositories/remote/entity-remote.repository';
import { ExamsRemoteRepository } from '@repositories/remote/exam-remote.repository';
import { NoteContentRemoteRepository } from '@repositories/remote/note-content-remote.repository';
import { NotesRemoteRepository } from '@repositories/remote/note-remote.repository';
import { ProjectsRemoteRepository } from '@repositories/remote/project-remote.repository';
import { TasksRemoteRepository } from '@repositories/remote/project-task-remote.repository';
import { QuizEntriesRemoteRepository } from '@repositories/remote/quiz-entry-remote.repository';
import { QuotesRemoteRepository } from '@repositories/remote/quote-remote.repository';
import { SessionsRemoteRepository } from '@repositories/remote/session-remote.repository';
import { TestSuitesRemoteRepository } from '@repositories/remote/test-suite-remote.repository';
import { WordsRemoteRepository } from '@repositories/remote/word-remote.repository';
import { selCore_firestoreConfig } from '@selectors/core/core-configuration.selectors';
import { VoidBookmarksCollection } from '@services/mock/remotestorage/bookmarks.collection';
import { VoidExamsCollection } from '@services/mock/remotestorage/exams.collection';
import { VoidNoteContentCollection } from '@services/mock/remotestorage/note-content.collection';
import { VoidNotesCollection } from '@services/mock/remotestorage/notes.collection';
import { VoidProjectsCollection } from '@services/mock/remotestorage/projects.collection';
import { VoidQuizEntriesCollection } from '@services/mock/remotestorage/quiz-entries.collection';
import { VoidQuotesCollection } from '@services/mock/remotestorage/quotes.collection';
import { VoidSessionsCollection } from '@services/mock/remotestorage/sessions.collection';
import { VoidTasksCollection } from '@services/mock/remotestorage/tasks.collection';
import { VoidTestSuitesCollection } from '@services/mock/remotestorage/test-suites.collection';
import { VoidWordsCollection } from '@services/mock/remotestorage/words.collection';
import { FirestoreAPIClient, FirestoreAPIClientImpl } from '@utils/firestore-rest-client/firestore-api.tool';
import { BookmarksFirestoreCollectionImpl } from './collections/bookmarks.collection';
import { ExamsFirestoreCollectionImpl } from './collections/exams.collection';
import { NoteContentFirestoreCollectionImpl } from './collections/note-content.collection';
import { NotesFirestoreCollectionImpl } from './collections/notes.collection';
import { ProjectsFirestoreCollectionImpl } from './collections/projects.collection';
import { QuizEntriesFirestoreCollectionImpl } from './collections/quiz-entries.collection';
import { QuotesFirestoreCollectionImpl } from './collections/quotes.collection';
import { SessionsFirestoreCollectionImpl } from './collections/sessions.collection';
import { TasksFirestoreCollectionImpl } from './collections/tasks.collection';
import { TestSuitesFirestoreCollectionImpl } from './collections/test-suites.collection';
import { WordsFirestoreCollectionImpl } from './collections/words.collection';

export class FirestoreRemoteRepositoryServiceImpl implements RemoteRepositoryService {

	bookmarks!: BookmarksRemoteRepository;
	exams!: ExamsRemoteRepository;
	notes!: NotesRemoteRepository;
	noteContent!: NoteContentRemoteRepository;
	projects!: ProjectsRemoteRepository;
	quizEntries!: QuizEntriesRemoteRepository;
	quotes!: QuotesRemoteRepository;
	sessions!: SessionsRemoteRepository;
	tasks!: TasksRemoteRepository;
	testSuites!: TestSuitesRemoteRepository;
	words!: WordsRemoteRepository;

	private store: Store = inject(Store);
	private http: HttpClient = inject(HttpClient);
	private firestore: FirestoreAPIClient = new FirestoreAPIClientImpl(this.http);

	constructor() {

		// initialize with mock collections
		this.init();

		// update when config available
		this.store.select(selCore_firestoreConfig).subscribe(config => {

			this.init(config);

		});

	}

	getRepository(entity: AppEntityType): EntityRemoteRepository<Entity> {

		switch (entity) {

			case AppEntityType.bookmark: return this.bookmarks;
			case AppEntityType.exam: return this.exams;
			case AppEntityType.note: return this.notes;
			case AppEntityType.noteContent: return this.noteContent;
			case AppEntityType.project: return this.projects;
			case AppEntityType.quizEntry: return this.quizEntries;
			case AppEntityType.quote: return this.quotes;
			case AppEntityType.task: return this.tasks;
			case AppEntityType.session: return this.sessions;
			case AppEntityType.testSuite: return this.testSuites;
			case AppEntityType.word: return this.words;

		}
		throw new Error(`Non-entity table requested: ${entity}`);


	}

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new BookmarksFirestoreCollectionImpl(this.firestore, config);
			this.exams = new ExamsFirestoreCollectionImpl(this.firestore, config);
			this.notes = new NotesFirestoreCollectionImpl(this.firestore, config);
			this.noteContent = new NoteContentFirestoreCollectionImpl(this.firestore, config);
			this.projects = new ProjectsFirestoreCollectionImpl(this.firestore, config);
			this.quizEntries = new QuizEntriesFirestoreCollectionImpl(this.firestore, config);
			this.quotes = new QuotesFirestoreCollectionImpl(this.firestore, config);
			this.sessions = new SessionsFirestoreCollectionImpl(this.firestore, config);
			this.tasks = new TasksFirestoreCollectionImpl(this.firestore, config);
			this.testSuites = new TestSuitesFirestoreCollectionImpl(this.firestore, config);
			this.words = new WordsFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new VoidBookmarksCollection();
			this.exams = new VoidExamsCollection();
			this.notes = new VoidNotesCollection();
			this.noteContent = new VoidNoteContentCollection();
			this.projects = new VoidProjectsCollection();
			this.quizEntries = new VoidQuizEntriesCollection();
			this.quotes = new VoidQuotesCollection();
			this.sessions = new VoidSessionsCollection();
			this.tasks = new VoidTasksCollection();
			this.testSuites = new VoidTestSuitesCollection();
			this.words = new VoidWordsCollection();

		}

	}

}
