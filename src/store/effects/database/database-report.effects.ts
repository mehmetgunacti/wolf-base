import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntity, LocalRepositoryNames, LocalRepositoryService, ModuleReport } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { BackupDatabase } from 'lib/utils/database.util';
import { NgProgress } from 'ngx-progressbar';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { databaseActions } from 'store/actions';

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

function entity(repo: LocalRepositoryService, entity: AppEntity): Row {

	return row(repo, entity.table, 'Entities');

}

function syncData(repo: LocalRepositoryService, entity: AppEntity): Row {

	return row(repo, entity.table_sync, 'Sync Data');

}

function remoteData(repo: LocalRepositoryService, entity: AppEntity): Row {

	return row(repo, entity.table_remote, 'Remote Data');

}

function trash(repo: LocalRepositoryService, entity: AppEntity): Row {

	return row(repo, entity.table_trash, 'Trash');

}

@Injectable()
export class DatabaseReportEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private progress: NgProgress = inject(NgProgress);

	showProgressBar$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.loadReport),
			tap(() => this.progress.ref().start()),

		),
		{ dispatch: false }

	);

	loadReport$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.loadReport),
			switchMap(() => forkJoin([

				forkJoin({

					name: of(AppEntities.bookmark.labelPlural),
					glyph: of('bookmarks'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.bookmark)),
						forkJoin(syncData(this.localRepository, AppEntities.bookmark)),
						forkJoin(remoteData(this.localRepository, AppEntities.bookmark)),
						forkJoin(trash(this.localRepository, AppEntities.bookmark)),
						forkJoin(row(this.localRepository, AppEntities.bookmark.table_clicks, 'Clicks'))

					])

				}),
				forkJoin({

					name: of(AppEntities.note.labelPlural),
					glyph: of('note_stack'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.note)),
						forkJoin(syncData(this.localRepository, AppEntities.note)),
						forkJoin(remoteData(this.localRepository, AppEntities.note)),
						forkJoin(trash(this.localRepository, AppEntities.note))

					])

				}),
				forkJoin({

					name: of(AppEntities.noteContent.labelPlural),
					glyph: of('note_stack'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.noteContent)),
						forkJoin(syncData(this.localRepository, AppEntities.noteContent)),
						forkJoin(remoteData(this.localRepository, AppEntities.noteContent)),
						forkJoin(trash(this.localRepository, AppEntities.noteContent))

					])

				}),
				forkJoin({

					name: of(AppEntities.quizEntry.labelPlural),
					glyph: of('trending_up'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.quizEntry)),
						forkJoin(syncData(this.localRepository, AppEntities.quizEntry)),
						forkJoin(remoteData(this.localRepository, AppEntities.quizEntry)),
						forkJoin(trash(this.localRepository, AppEntities.quizEntry))

					])

				}),
				forkJoin({

					name: of(AppEntities.quote.labelPlural),
					glyph: of('format_quote'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.quote)),
						forkJoin(syncData(this.localRepository, AppEntities.quote)),
						forkJoin(remoteData(this.localRepository, AppEntities.quote)),
						forkJoin(trash(this.localRepository, AppEntities.quote))

					])

				}),
				forkJoin({

					name: of(AppEntities.word.labelPlural),
					glyph: of('dictionary'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.word)),
						forkJoin(syncData(this.localRepository, AppEntities.word)),
						forkJoin(remoteData(this.localRepository, AppEntities.word)),
						forkJoin(trash(this.localRepository, AppEntities.word))

					])

				}),
				forkJoin({

					name: of(AppEntities.project.labelPlural),
					glyph: of('task_alt'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.project)),
						forkJoin(syncData(this.localRepository, AppEntities.project)),
						forkJoin(remoteData(this.localRepository, AppEntities.project)),
						forkJoin(trash(this.localRepository, AppEntities.project))

					])

				}),
				forkJoin({

					name: of(AppEntities.task.labelPlural),
					glyph: of('task_alt'),
					reports: forkJoin([

						forkJoin(entity(this.localRepository, AppEntities.task)),
						forkJoin(syncData(this.localRepository, AppEntities.task)),
						forkJoin(remoteData(this.localRepository, AppEntities.task)),
						forkJoin(trash(this.localRepository, AppEntities.task))

					])

				}),
				forkJoin({

					name: of('Logs'),
					glyph: of('history'),
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
			tap(() => this.progress.ref().complete())

		),
		{ dispatch: false }

	);

}
