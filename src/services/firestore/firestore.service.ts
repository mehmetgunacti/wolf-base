import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppEntityType } from '@constants';
import { RemoteRepositoryService } from '@libServices';
import { Entity, FirestoreConfig } from '@models';
import { Store } from '@ngrx/store';
import * as repo from '@repositories';
import { selCore_firestoreConfig } from '@selectors';
import * as service from '@services';
import { FirestoreAPIClient, FirestoreAPIClientImpl } from '@utils';
import * as collection from './collections';

export class FirestoreRemoteRepositoryServiceImpl implements RemoteRepositoryService {

	public bookmarks!: repo.BookmarksRemoteRepository;
	public notes!: repo.NotesRemoteRepository;
	public noteContent!: repo.NoteContentRemoteRepository;
	public projects!: repo.ProjectsRemoteRepository;
	public quizEntries!: repo.QuizEntriesRemoteRepository;
	public quotes!: repo.QuotesRemoteRepository;
	public tasks!: repo.TasksRemoteRepository;
	public words!: repo.WordsRemoteRepository;

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

	getRepository(entity: AppEntityType): repo.EntityRemoteRepository<Entity> {

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

	}

	private init(config: FirestoreConfig | null = null): void {

		if (config) {

			this.bookmarks = new collection.BookmarksFirestoreCollectionImpl(this.firestore, config);
			this.notes = new collection.NotesFirestoreCollectionImpl(this.firestore, config);
			this.noteContent = new collection.NoteContentFirestoreCollectionImpl(this.firestore, config);
			this.projects = new collection.ProjectsFirestoreCollectionImpl(this.firestore, config);
			this.quizEntries = new collection.QuizEntriesFirestoreCollectionImpl(this.firestore, config);
			this.quotes = new collection.QuotesFirestoreCollectionImpl(this.firestore, config);
			this.tasks = new collection.TasksFirestoreCollectionImpl(this.firestore, config);
			this.words = new collection.WordsFirestoreCollectionImpl(this.firestore, config);

		} else {

			this.bookmarks = new service.VoidBookmarksCollection();
			this.notes = new service.VoidNotesCollection();
			this.noteContent = new service.VoidNoteContentCollection();
			this.projects = new service.VoidProjectsCollection();
			this.quizEntries = new service.VoidQuizEntriesCollection();
			this.quotes = new service.VoidQuotesCollection();
			this.tasks = new service.VoidTasksCollection();
			this.words = new service.VoidWordsCollection();

		}

	}

}
