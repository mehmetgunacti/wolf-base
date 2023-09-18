import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeOutTrigger } from 'modules/shared';
import { Observable, delay, of, switchMap, takeWhile, tap } from 'rxjs';
import { selCoreIsInitialized } from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-root',
	template: `
		<ng-container *ngIf="initialized$ | async; else loading">
			<router-outlet></router-outlet>
		</ng-container>
		<ng-template #loading>
			<div id="splashScreen" @fadeOut>
				<img src="assets/logo.svg" alt="Wolf Base loading...">
			</div>
		</ng-template>
	`,
	animations: [fadeOutTrigger]
})
export class AppComponent {

	initialized$: Observable<boolean>;
	
	constructor(store: Store) {

		this.initialized$ = store.select(selCoreIsInitialized).pipe(

			switchMap((value: boolean) => {

				// to tweak splashscreen duration:
				// delay(), _splashscreen.scss and fade-out.animation.ts
				if (value)
					return of(true).pipe(delay(1400));
				return of(false);

			}),
			takeWhile(value => !value, true)

		);

	}

}
