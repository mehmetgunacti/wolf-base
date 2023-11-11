import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { Configuration, LocalRepositoryService } from '@lib';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { confChanged } from 'store/actions/core.actions';

@Injectable()
export class CoreEffects {

	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	listenToConfChanges$ = createEffect(

		() => fromEventPattern<Configuration>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localRepository.configuration.getConfiguration()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map((configuration: Configuration) => confChanged({ configuration }))
		)

	);

}
