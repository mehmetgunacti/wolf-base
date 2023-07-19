import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SyncActions } from 'store/actions';
import * as fromCore from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-sync-page',
	templateUrl: './sync-page.component.html'
})
export class SyncPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(fromCore.isFirestoreApiKeyMissing);

	}

	onStart(): void {

		this.store.dispatch(SyncActions.syncTrigger());

	}

}