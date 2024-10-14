import { inject } from '@angular/core';
import { BookmarkSyncService, LocalRepositoryService, RemoteRepositoryService } from '@libServices';
import { Click } from '@models';
import { Observable, filter, from, of, switchMap } from 'rxjs';
import { LOCAL_REPOSITORY_SERVICE, REMOTE_REPOSITORY_SERVICE } from './repository.service';

export class BookmarkSyncServiceImpl implements BookmarkSyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_REPOSITORY_SERVICE);

	uploadClicks(clicks: Click[]): Observable<Click> {

		return of(clicks).pipe(

			switchMap(clicks =>

				// upload all clicks
				this.remoteRepository.bookmarks.uploadClicks(clicks).pipe(

					// store click locally
					switchMap(click => this.localRepository.bookmarks.storeClick(click))

				)

			)

		);

	}

	downloadClicks(): Observable<Click[]> {

		return from(this.localRepository.bookmarks.listClicked()).pipe(

			// check if clicked bookmarks available
			filter(clicked => clicked.length === 0),

			// download all clicks
			switchMap(() =>

				this.remoteRepository.bookmarks.downloadClicks().pipe(

					switchMap(clicks =>

						// store all clicks
						this.localRepository.bookmarks.storeClicks(clicks)

					)

				)

			)

		);

	}

}
