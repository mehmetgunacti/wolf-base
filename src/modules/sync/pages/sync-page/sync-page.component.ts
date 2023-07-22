import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { syncTrigger } from 'store/actions/sync.actions';
import * as fromCore from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-sync-page',
	templateUrl: './sync-page.component.html'
})
export class SyncPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(fromCore.isFirestoreConfigMissing);

	}

	onStart(): void {

		this.store.dispatch(syncTrigger());

	}

}