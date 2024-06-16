import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { DatabaseReport, EntityReport, LocalRepositoryNames, LocalRepositoryService } from '@lib';
import { BackupDatabase } from 'lib/utils/database.util';
import { map, switchMap } from 'rxjs/operators';
import { backupDatabase, loadReport, loadReportSuccess, loadValues, loadValuesSuccess } from 'store/actions/database.actions';

@Injectable()
export class DatabaseEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

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
					logs: { count: arr[26], size: arr[27] }

				};
				return report;

			}),
			map(report => loadReportSuccess({ report }))

		)

	);

	// selectValues$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(loadValues),
	// 		switchMap(({ tablename }) => this.localRepository.dump(tablename)),
	// 		map(dump => Object.values(dump)),
	// 		map(selectedValues => loadValuesSuccess({ selectedValues }))

	// 	)

	// );

}
