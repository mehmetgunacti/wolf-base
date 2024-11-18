import { coreActions } from '@actions/core.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { forkJoin, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

function entityData(
	repo: LocalRepositoryService,
	entityType: AppEntityType,
	entities: boolean = true,
	syncData: boolean = true,
	remoteMetadata: boolean = true,
	uuids: boolean = false
) {

	return {

		entityType: of(entityType),
		entities: entities ? from(repo.getRepository(entityType).list()) : of([]),
		syncData: syncData ? from(repo.getRepository(entityType).listSyncData()) : of([]),
		remoteMetadata: remoteMetadata ? from(repo.getRepository(entityType).listRemoteMetadata()) : of([]),
		uuids: uuids ? from(repo.getRepository(entityType).listIds()) : of([])

	};

}

@Injectable()
export class CoreLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.loadAll),
			switchMap(() => forkJoin({

				configuration: from(this.localRepository.configuration.getConfiguration()),
				entities: forkJoin([
					forkJoin(entityData(this.localRepository, AppEntityType.bookmark)),
					forkJoin(entityData(this.localRepository, AppEntityType.note)),
					forkJoin(entityData(this.localRepository, AppEntityType.noteContent, false, true, true, true)),
					forkJoin(entityData(this.localRepository, AppEntityType.word)),
					forkJoin(entityData(this.localRepository, AppEntityType.quote)),
					forkJoin(entityData(this.localRepository, AppEntityType.quizEntry)),
					forkJoin(entityData(this.localRepository, AppEntityType.project)),
					forkJoin(entityData(this.localRepository, AppEntityType.task))
				]),
				clicks: from(this.localRepository.bookmarks.listClicks())

			})),
			map(values => coreActions.loadAllSuccess(values))

		)

	);

}
