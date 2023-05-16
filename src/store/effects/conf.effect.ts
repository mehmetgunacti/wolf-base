import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Configuration, LocalStorageService } from 'lib';
import { map } from 'rxjs/operators';
import * as fromActions from 'store/actions';

@Injectable()
export class ConfEffects {

	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	listenToConfChanges$ = createEffect(

		() => this.localStorage.configuration.dump$().pipe(
			map((configuration: Configuration) => fromActions.confChanged({ configuration }))
		)

	);

}
