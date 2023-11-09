import { inject } from '@angular/core';
import { BookmarkSyncService, LocalRepositoryService } from '@lib';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { RemoteRepositoryService } from 'lib/services/remote-repository.service';
import { Observable, from, switchMap, tap } from 'rxjs';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';

export class BookmarkSyncServiceImpl implements BookmarkSyncService {

	private localRepository: LocalRepositoryService = inject(LOCAL_STORAGE_SERVICE);
	private remoteRepository: RemoteRepositoryService = inject(REMOTE_STORAGE_SERVICE);
	private store: Store = inject(Store);

	uploadClicks(): Observable<number> {

		return this.store.select(selBookmarkClicked).pipe(

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
