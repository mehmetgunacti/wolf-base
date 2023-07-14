import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from 'store/core';
import * as fromSync from 'store/sync';

@Component({
	selector: 'app-sync-page',
	templateUrl: './sync-page.component.html'
})
export class SyncPageComponent {

	private store: Store = inject(Store);

	isBigScreen$: Observable<boolean>;
	isFirestoreConfigDialogVisible$: Observable<boolean>;
	isFirestoreConfigMissing$: Observable<boolean>;

	constructor() {

		this.isBigScreen$ = this.store.select(fromCore.isBigScreen);
		this.isFirestoreConfigDialogVisible$ = this.store.select(fromSync.isFirestoreConfigDialogVisible);
		this.isFirestoreConfigMissing$ = this.store.select(fromCore.isFirestoreApiKeyMissing);

	}

	closeFirestoreDialog(): void {

		this.store.dispatch(fromSync.closeFirestoreDialog());

	}

	onStart(): void {

		this.store.dispatch(fromSync.syncTrigger());

	}

	showFirestoreConfig(): void {

		this.store.dispatch(fromSync.showFirestoreDialog());

	}

}