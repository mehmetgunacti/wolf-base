import { Injectable, inject } from '@angular/core';
import { AppEntities, DatabaseReport, LocalRepositoryNames, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { BackupDatabase } from 'lib/utils/database.util';
import { NgProgress } from 'ngx-progressbar';
import { map, switchMap, tap } from 'rxjs/operators';
import { databaseActions } from 'store/actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private progress: NgProgress = inject(NgProgress);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(databaseActions.backupDatabase),
			switchMap(() => new BackupDatabase(this.localRepository).execute())

		),
		{ dispatch: false }

	);

	loadReport$ = createEffect(

		// todo refactor this
		() => this.actions$.pipe(

			ofType(databaseActions.loadReport),
			tap(() => this.progress.ref().start()),
			switchMap(() => Promise.all([

				this.localRepository.count(AppEntities.bookmark.table),
				this.localRepository.size(AppEntities.bookmark.table),
				this.localRepository.count(AppEntities.bookmark.table_sync),
				this.localRepository.size(AppEntities.bookmark.table_sync),
				this.localRepository.count(AppEntities.bookmark.table_remote),
				this.localRepository.size(AppEntities.bookmark.table_remote),
				this.localRepository.count(AppEntities.bookmark.table_trash),
				this.localRepository.size(AppEntities.bookmark.table_trash),

				this.localRepository.count(AppEntities.bookmark.table_clicks),
				this.localRepository.size(AppEntities.bookmark.table_clicks),

				this.localRepository.count(AppEntities.note.table),
				this.localRepository.size(AppEntities.note.table),
				this.localRepository.count(AppEntities.note.table_sync),
				this.localRepository.size(AppEntities.note.table_sync),
				this.localRepository.count(AppEntities.note.table_remote),
				this.localRepository.size(AppEntities.note.table_remote),
				this.localRepository.count(AppEntities.note.table_trash),
				this.localRepository.size(AppEntities.note.table_trash),

				this.localRepository.count(AppEntities.noteContent.table),
				this.localRepository.size(AppEntities.noteContent.table),
				this.localRepository.count(AppEntities.noteContent.table_sync),
				this.localRepository.size(AppEntities.noteContent.table_sync),
				this.localRepository.count(AppEntities.noteContent.table_remote),
				this.localRepository.size(AppEntities.noteContent.table_remote),
				this.localRepository.count(AppEntities.noteContent.table_trash),
				this.localRepository.size(AppEntities.noteContent.table_trash),

				this.localRepository.count(AppEntities.quizEntry.table),
				this.localRepository.size(AppEntities.quizEntry.table),
				this.localRepository.count(AppEntities.quizEntry.table_sync),
				this.localRepository.size(AppEntities.quizEntry.table_sync),
				this.localRepository.count(AppEntities.quizEntry.table_remote),
				this.localRepository.size(AppEntities.quizEntry.table_remote),
				this.localRepository.count(AppEntities.quizEntry.table_trash),
				this.localRepository.size(AppEntities.quizEntry.table_trash),

				this.localRepository.count(AppEntities.quote.table),
				this.localRepository.size(AppEntities.quote.table),
				this.localRepository.count(AppEntities.quote.table_sync),
				this.localRepository.size(AppEntities.quote.table_sync),
				this.localRepository.count(AppEntities.quote.table_remote),
				this.localRepository.size(AppEntities.quote.table_remote),
				this.localRepository.count(AppEntities.quote.table_trash),
				this.localRepository.size(AppEntities.quote.table_trash),

				this.localRepository.count(AppEntities.word.table),
				this.localRepository.size(AppEntities.word.table),
				this.localRepository.count(AppEntities.word.table_sync),
				this.localRepository.size(AppEntities.word.table_sync),
				this.localRepository.count(AppEntities.word.table_remote),
				this.localRepository.size(AppEntities.word.table_remote),
				this.localRepository.count(AppEntities.word.table_trash),
				this.localRepository.size(AppEntities.word.table_trash),

				this.localRepository.count(AppEntities.project.table),
				this.localRepository.size(AppEntities.project.table),
				this.localRepository.count(AppEntities.project.table_sync),
				this.localRepository.size(AppEntities.project.table_sync),
				this.localRepository.count(AppEntities.project.table_remote),
				this.localRepository.size(AppEntities.project.table_remote),
				this.localRepository.count(AppEntities.project.table_trash),
				this.localRepository.size(AppEntities.project.table_trash),

				this.localRepository.count(AppEntities.task.table),
				this.localRepository.size(AppEntities.task.table),
				this.localRepository.count(AppEntities.task.table_sync),
				this.localRepository.size(AppEntities.task.table_sync),
				this.localRepository.count(AppEntities.task.table_remote),
				this.localRepository.size(AppEntities.task.table_remote),
				this.localRepository.count(AppEntities.task.table_trash),
				this.localRepository.size(AppEntities.task.table_trash),

				this.localRepository.count(LocalRepositoryNames.logs),
				this.localRepository.size(LocalRepositoryNames.logs)

			])),
			map(arr => {

				const report: DatabaseReport = {

					bookmarks: {

						entities: { count: arr[0], size: arr[1] },
						syncData: { count: arr[2], size: arr[3] },
						remoteData: { count: arr[4], size: arr[5] },
						trash: { count: arr[6], size: arr[7] },
						clicks: { count: arr[8], size: arr[9] }

					},
					notes: {

						entities: { count: arr[10], size: arr[11] },
						syncData: { count: arr[12], size: arr[13] },
						remoteData: { count: arr[14], size: arr[15] },
						trash: { count: arr[16], size: arr[17] }

					},
					notesContent: {

						entities: { count: arr[18], size: arr[19] },
						syncData: { count: arr[20], size: arr[21] },
						remoteData: { count: arr[22], size: arr[23] },
						trash: { count: arr[24], size: arr[25] }

					},
					quizEntries: {

						entities: { count: arr[26], size: arr[27] },
						syncData: { count: arr[28], size: arr[29] },
						remoteData: { count: arr[30], size: arr[31] },
						trash: { count: arr[32], size: arr[33] }

					},
					quotes: {

						entities: { count: arr[34], size: arr[35] },
						syncData: { count: arr[36], size: arr[37] },
						remoteData: { count: arr[38], size: arr[39] },
						trash: { count: arr[40], size: arr[41] }

					},
					words: {

						entities: { count: arr[42], size: arr[43] },
						syncData: { count: arr[44], size: arr[45] },
						remoteData: { count: arr[46], size: arr[47] },
						trash: { count: arr[48], size: arr[49] }

					},
					projects: {

						entities: { count: arr[50], size: arr[51] },
						syncData: { count: arr[52], size: arr[53] },
						remoteData: { count: arr[54], size: arr[55] },
						trash: { count: arr[56], size: arr[57] }

					},
					tasks: {

						entities: { count: arr[58], size: arr[59] },
						syncData: { count: arr[60], size: arr[61] },
						remoteData: { count: arr[62], size: arr[63] },
						trash: { count: arr[64], size: arr[65] }

					},
					logs: { count: arr[66], size: arr[67] }

				};
				return report;

			}),
			map(report => databaseActions.loadReportSuccess({ report }))

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
