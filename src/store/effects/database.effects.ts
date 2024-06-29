import { Injectable, inject } from '@angular/core';
import { DatabaseReport, LocalRepositoryNames, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { BackupDatabase } from 'lib/utils/database.util';
import { NgProgress } from 'ngx-progressbar';
import { map, switchMap, tap } from 'rxjs/operators';
import { backupDatabase, loadReport, loadReportSuccess } from 'store/actions/database.actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private progress: NgProgress = inject(NgProgress);

	generateZip$ = createEffect(

		() => this.actions$.pipe(

			ofType(backupDatabase),
			switchMap(() => new BackupDatabase(this.localRepository).execute())

		),
		{ dispatch: false }

	);

	loadReport$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadReport),
			tap(() => this.progress.ref().start()),
			switchMap(() => Promise.all([

				this.localRepository.count(LocalRepositoryNames.bookmarks),
				this.localRepository.size(LocalRepositoryNames.bookmarks),
				this.localRepository.count(LocalRepositoryNames.bookmarks_sync),
				this.localRepository.size(LocalRepositoryNames.bookmarks_sync),
				this.localRepository.count(LocalRepositoryNames.bookmarks_remote),
				this.localRepository.size(LocalRepositoryNames.bookmarks_remote),
				this.localRepository.count(LocalRepositoryNames.bookmarks_trash),
				this.localRepository.size(LocalRepositoryNames.bookmarks_trash),

				this.localRepository.count(LocalRepositoryNames.bookmarks_clicks),
				this.localRepository.size(LocalRepositoryNames.bookmarks_clicks),

				this.localRepository.count(LocalRepositoryNames.notes),
				this.localRepository.size(LocalRepositoryNames.notes),
				this.localRepository.count(LocalRepositoryNames.notes_sync),
				this.localRepository.size(LocalRepositoryNames.notes_sync),
				this.localRepository.count(LocalRepositoryNames.notes_remote),
				this.localRepository.size(LocalRepositoryNames.notes_remote),
				this.localRepository.count(LocalRepositoryNames.notes_trash),
				this.localRepository.size(LocalRepositoryNames.notes_trash),

				this.localRepository.count(LocalRepositoryNames.note_content),
				this.localRepository.size(LocalRepositoryNames.note_content),
				this.localRepository.count(LocalRepositoryNames.note_content_sync),
				this.localRepository.size(LocalRepositoryNames.note_content_sync),
				this.localRepository.count(LocalRepositoryNames.note_content_remote),
				this.localRepository.size(LocalRepositoryNames.note_content_remote),
				this.localRepository.count(LocalRepositoryNames.note_content_trash),
				this.localRepository.size(LocalRepositoryNames.note_content_trash),

				this.localRepository.count(LocalRepositoryNames.words),
				this.localRepository.size(LocalRepositoryNames.words),
				this.localRepository.count(LocalRepositoryNames.words_sync),
				this.localRepository.size(LocalRepositoryNames.words_sync),
				this.localRepository.count(LocalRepositoryNames.words_remote),
				this.localRepository.size(LocalRepositoryNames.words_remote),
				this.localRepository.count(LocalRepositoryNames.words_trash),
				this.localRepository.size(LocalRepositoryNames.words_trash),

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
					words: {

						entities: { count: arr[26], size: arr[27] },
						syncData: { count: arr[28], size: arr[29] },
						remoteData: { count: arr[30], size: arr[31] },
						trash: { count: arr[32], size: arr[33] }

					},
					logs: { count: arr[34], size: arr[35] }

				};
				return report;

			}),
			map(report => loadReportSuccess({ report }))

		)

	);

	loadReportSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadReportSuccess),
			tap(() => this.progress.ref().complete())

		),
		{ dispatch: false }

	);

}
