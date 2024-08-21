import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Entity, AppEntityType, FirestoreConfig } from '@lib';
import { Store } from "@ngrx/store";
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository, ProjectsRemoteRepository, QuizEntriesRemoteRepository, QuotesRemoteRepository } from 'lib/repositories/remote';
import { NotesRemoteRepository } from 'lib/repositories/remote/note-remote.repository';
import { TasksRemoteRepository } from 'lib/repositories/remote/project-task-remote.repository';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { FirestoreAPIClient, FirestoreAPIClientImpl } from "lib/utils/firestore-rest-client/firestore-api.tool";
import { VoidBookmarksCollection } from "services/mock-services/remotestorage/collections/bookmarks.collection";
import { VoidNoteContentCollection } from 'services/mock-services/remotestorage/collections/note-content.collection';
import { VoidNotesCollection } from 'services/mock-services/remotestorage/collections/notes.collection';
import { VoidProjectsCollection } from 'services/mock-services/remotestorage/collections/projects.collection';
import { VoidQuizEntriesCollection } from 'services/mock-services/remotestorage/collections/quiz-entries.collection';
import { VoidQuotesCollection } from 'services/mock-services/remotestorage/collections/quotes.collection';
import { VoidTasksCollection } from 'services/mock-services/remotestorage/collections/tasks.collection';
import { VoidWordsCollection } from 'services/mock-services/remotestorage/collections/words.collection';
import { selCore_firestoreConfig } from "store/selectors/core-configuration.selectors";
import { BookmarksFirestoreCollectionImpl, QuotesFirestoreCollectionImpl, TasksFirestoreCollectionImpl, WordsFirestoreCollectionImpl } from "./collections";
import { NoteContentFirestoreCollectionImpl } from './collections/note-content.collection';
import { NotesFirestoreCollectionImpl } from './collections/notes.collection';
import { ProjectsFirestoreCollectionImpl } from './collections/projects.collection';
import { QuizEntriesFirestoreCollectionImpl } from './collections/quiz-entries.collection';

export class FirestoreRemoteRepositoryServiceImpl implements RemoteRepositoryService {

	public bookmarks!: BookmarksRemoteRepository;
	public notes!: NotesRemoteRepository;
	public noteContent!: NoteContentRemoteRepository;
	public projects!: ProjectsRemoteRepository;
	public quizEntries!: QuizEntriesRemoteRepository;
	public quotes!: QuotesRemoteRepository;
	public tasks!: TasksRemoteRepository;
	public words!: WordsRemoteRepository;

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
			case AppEntityType.note: return this.notes;
			case AppEntityType.noteContent: return this.noteContent;
			case AppEntityType.project: return this.projects;
			case AppEntityType.quizEntry: return this.quizEntries;
			case AppEntityType.quote: return this.quotes;
			case AppEntityType.task: return this.tasks;
			case AppEntityType.word: return this.words;

		}
		throw Error('Unknown entity');

	}

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new BookmarksFirestoreCollectionImpl(this.firestore, config);
			this.notes = new NotesFirestoreCollectionImpl(this.firestore, config);
			this.noteContent = new NoteContentFirestoreCollectionImpl(this.firestore, config);
			this.projects = new ProjectsFirestoreCollectionImpl(this.firestore, config);
			this.quizEntries = new QuizEntriesFirestoreCollectionImpl(this.firestore, config);
			this.quotes = new QuotesFirestoreCollectionImpl(this.firestore, config);
			this.tasks = new TasksFirestoreCollectionImpl(this.firestore, config);
			this.words = new WordsFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new VoidBookmarksCollection();
			this.notes = new VoidNotesCollection();
			this.noteContent = new VoidNoteContentCollection();
			this.projects = new VoidProjectsCollection();
			this.quizEntries = new VoidQuizEntriesCollection();
			this.quotes = new VoidQuotesCollection();
			this.tasks = new VoidTasksCollection();
			this.words = new VoidWordsCollection();

		}

	}

}
