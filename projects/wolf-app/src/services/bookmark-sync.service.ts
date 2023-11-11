import { inject } from '@angular/core';
import { BookmarkSyncService, Click, LocalRepositoryService } from '@lib';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from 'app/app.config';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { Observable, of, switchMap } from 'rxjs';

export class BookmarkSyncServiceImpl implements BookmarkSyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_REPOSITORY_SERVICE);

	uploadClicks(clicks: Click[]): Observable<number> {

		return of(clicks).pipe(

			switchMap(clicks =>

				// upload all clicks
				this.remoteRepository.bookmarks.uploadClicks(clicks).pipe(

					switchMap(() =>

						// then download all clicks
						this.remoteRepository.bookmarks.downloadClicks().pipe(

							// save all downloaded clicks
							switchMap(clicks => this.localRepository.bookmarks.storeClicks(clicks))

						)

					)

				)

			)

		)

	}

}
