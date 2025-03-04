import { coreActions } from '@actions/core.actions';
import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selEntity_storeEmpty } from '@selectors/entity/entity.selectors';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { demoDataBookmarks } from 'data/bookmarks';
import { demoDataExams } from 'data/exams';
import { demoDataNoteContent } from 'data/note-content';
import { demoDataNotes } from 'data/notes';
import { demoDataProjects } from 'data/projects';
import { demoDataQuizEntries } from 'data/quiz-entries';
import { demoDataQuotes } from 'data/quotes';
import { demoDataSessions } from 'data/sessions';
import { demoDataTasks } from 'data/tasks';
import { demoDataTestSuites } from 'data/test-suites';
import { demoDataWords } from 'data/words';
import { environment } from 'environments/environment';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CoreLoadDemoDataEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	createDemoData$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.loadAllSuccess),
			filter(() => environment.isDemo),
			concatLatestFrom(() => this.store.select(selEntity_storeEmpty)),
			filter(([ , storeEmpty ]) => storeEmpty),

			switchMap(() => Promise.all([

				this.localRepository.bookmarks.putAll(demoDataBookmarks),
				this.localRepository.notes.putAll(demoDataNotes),
				this.localRepository.noteContent.putAll(demoDataNoteContent),
				this.localRepository.words.putAll(demoDataWords),
				this.localRepository.quizEntries.putAll(demoDataQuizEntries),
				this.localRepository.quotes.putAll(demoDataQuotes),
				this.localRepository.projects.putAll(demoDataProjects),
				this.localRepository.tasks.putAll(demoDataTasks),
				this.localRepository.testSuites.putAll(demoDataTestSuites),
				this.localRepository.exams.putAll(demoDataExams),
				this.localRepository.sessions.putAll(demoDataSessions)

			])),

			map(values => coreActions.createDemoDataSuccess())

		)

	);

	dispatchLoadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.createDemoDataSuccess),
			map(values => coreActions.loadAll())

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.createDemoDataSuccess),
			map(values => coreActions.showNotification({ severity: 'success', summary: 'Demo data loaded' }))

		)

	);

}
