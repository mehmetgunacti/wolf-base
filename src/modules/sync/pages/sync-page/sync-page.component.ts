import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, IDBase, LocalStorageService, UUID } from 'lib';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { showNotification } from 'store/actions/core-notification.actions';
import { closeConflictDialog, closeSyncDialog, loadFirstConflict, openSyncDialog, syncTrigger } from 'store/actions/sync.actions';
import { isFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';
import { isBigScreen } from 'store/selectors/core-ui.selectors';
import { isConflictDialogVisible, isSyncDialogVisible, selectedConflict } from 'store/selectors/sync.selectors';

@Component({
	selector: 'app-sync-page',
	templateUrl: './sync-page.component.html',
	providers: [ConfirmationService]
})
export class SyncPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;
	isConflictDialogVisible$: Observable<boolean>;
	isSyncDialogVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;
	conflictDialogTitle$: Observable<string>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(isFirestoreConfigMissing);
		this.isConflictDialogVisible$ = this.store.select(isConflictDialogVisible);
		this.isSyncDialogVisible$ = this.store.select(isSyncDialogVisible);
		this.isBigScreen$ = this.store.select(isBigScreen);
		this.conflictDialogTitle$ = this.store.select(selectedConflict).pipe(map(sd => `Conflict: "${sd?.error ?? ''}"`));

	}

	onOpenSyncDialog(): void {

		this.store.dispatch(openSyncDialog());

	}

	closeConflictDialog(): void {

		this.store.dispatch(closeConflictDialog());

	}

	closeSyncDialog(): void {

		this.store.dispatch(closeSyncDialog());

	}

}