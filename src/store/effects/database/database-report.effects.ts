import { databaseActions } from '@actions/database.actions';
import { inject, Injectable } from '@angular/core';
import { DbStore, LocalRepositoryNames } from '@constants/database.constant';
import { AppEntities } from '@constants/entity.constant';
import { GlyphName } from '@constants/glyphs.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { ModuleReport } from '@models/database.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Row extends Record<string, Observable<any>> {

	label: Observable<string>;
	table: Observable<string>;
	count: Observable<number>;
	size: Observable<number>;

}

function row(repo: LocalRepositoryService, table: string, label: string): Row {

	return {

		label: of(label),
		table: of(table),
		count: from(repo.count(table)),
		size: from(repo.size(table))

	};

}

function entity(repo: LocalRepositoryService, entityTable: DbStore): Row {

	return row(repo, entityTable, 'Entities');

}

function syncData(repo: LocalRepositoryService, syncTable: DbStore): Row {

	return row(repo, syncTable, 'Sync Data');

}

function remoteData(repo: LocalRepositoryService, remoteTable: DbStore): Row {

	return row(repo, remoteTable, 'Remote Data');

}

function trash(repo: LocalRepositoryService, trashTable: DbStore): Row {

	return row(repo, trashTable, 'Trash');

}

@Injectable()
export class DatabaseReportEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	showProgressBar$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.loadReport)

		),
		{ dispatch: false }

	);

	loadReport$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.loadReport),
			switchMap(() => forkJoin([

				forkJoin({

					name: of(AppEntities.bookmark.labelPlural),
					glyph: of('bookmarks' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.bookmarks)),
						forkJoin(syncData(this.localRepository, DbStore.bookmarks_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.bookmarks_remote)),
						forkJoin(trash(this.localRepository, DbStore.bookmarks_trash)),
						forkJoin(row(this.localRepository, DbStore.bookmarks_clicks, 'Clicks'))

					])

				}),
				forkJoin({

					name: of(AppEntities.exam.labelPlural),
					glyph: of('school' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.exams)),
						forkJoin(syncData(this.localRepository, DbStore.exams_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.exams_remote)),
						forkJoin(trash(this.localRepository, DbStore.exams_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.note.labelPlural),
					glyph: of('note_stack' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.notes)),
						forkJoin(syncData(this.localRepository, DbStore.notes_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.notes_remote)),
						forkJoin(trash(this.localRepository, DbStore.notes_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.noteContent.labelPlural),
					glyph: of('note_stack' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.note_content)),
						forkJoin(syncData(this.localRepository, DbStore.note_content_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.note_content_remote)),
						forkJoin(trash(this.localRepository, DbStore.note_content_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.quizEntry.labelPlural),
					glyph: of('quiz' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.quiz_entries)),
						forkJoin(syncData(this.localRepository, DbStore.quiz_entries_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.quiz_entries_remote)),
						forkJoin(trash(this.localRepository, DbStore.quiz_entries_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.quote.labelPlural),
					glyph: of('format_quote' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.quotes)),
						forkJoin(syncData(this.localRepository, DbStore.quotes_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.quotes_remote)),
						forkJoin(trash(this.localRepository, DbStore.quotes_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.session.labelPlural),
					glyph: of('school' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.sessions)),
						forkJoin(syncData(this.localRepository, DbStore.sessions_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.sessions_remote)),
						forkJoin(trash(this.localRepository, DbStore.sessions_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.word.labelPlural),
					glyph: of('dictionary' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.words)),
						forkJoin(syncData(this.localRepository, DbStore.words_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.words_remote)),
						forkJoin(trash(this.localRepository, DbStore.words_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.project.labelPlural),
					glyph: of('task_alt' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.projects)),
						forkJoin(syncData(this.localRepository, DbStore.projects_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.projects_remote)),
						forkJoin(trash(this.localRepository, DbStore.projects_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.task.labelPlural),
					glyph: of('task_alt' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.tasks)),
						forkJoin(syncData(this.localRepository, DbStore.tasks_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.tasks_remote)),
						forkJoin(trash(this.localRepository, DbStore.tasks_trash))

					])

				}),
				forkJoin({

					name: of(AppEntities.testSuite.labelPlural),
					glyph: of('school' as GlyphName),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, DbStore.test_suites)),
						forkJoin(syncData(this.localRepository, DbStore.test_suites_sync)),
						forkJoin(remoteData(this.localRepository, DbStore.test_suites_remote)),
						forkJoin(trash(this.localRepository, DbStore.test_suites_trash))

					])

				}),
				forkJoin({

					name: of('Logs'),
					glyph: of('history' as GlyphName),
					reports: forkJoin([

						forkJoin(row(this.localRepository, LocalRepositoryNames.logs, 'Logs'))

					])

				})

			])
			),
			map((reports: ModuleReport[]) => databaseActions.loadReportSuccess({ reports }))

		)

	);

	loadReportSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.loadReportSuccess),
			// tap(() => this.progress.ref().complete())

		),
		{ dispatch: false }

	);

}
