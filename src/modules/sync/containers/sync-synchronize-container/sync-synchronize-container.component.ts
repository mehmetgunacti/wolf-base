import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISODateString, RemoteCollection, SyncLog, SyncMessage } from 'lib';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { showNotification } from 'store/actions/core-notification.actions';
import { clearSyncLogs, loadSyncMessages, syncBackupDatabase, syncTrigger } from 'store/actions/sync.actions';
import { syncLogs, syncMessages } from 'store/selectors/sync.selectors';

@Component({
	selector: 'app-sync-synchronize-container',
	templateUrl: './sync-synchronize-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSynchronizeContainerComponent {

	private store: Store = inject(Store);
	private confirmationService: ConfirmationService = inject(ConfirmationService);

	syncLogs$: Observable<SyncLog[]>;
	messages$: Observable<SyncMessage[]>;

	constructor() {

		this.syncLogs$ = this.store.select(syncLogs);
		this.messages$ = this.store.select(syncMessages);

	}

	onStart(): void {

		this.confirmationService.confirm({

			message: 'Download local database?',
			header: 'Backup',
			icon: 'pi pi-database',
			accept: async () => {

				this.store.dispatch(syncBackupDatabase());

			},
			reject: (type: ConfirmEventType) => {

				switch (type) {
					case ConfirmEventType.REJECT:
						this.store.dispatch(showNotification({ severity: 'info', summary: 'Sync started', detail: 'Backup skipped' }));
						this.store.dispatch(syncTrigger());
						break;
					case ConfirmEventType.CANCEL:
						this.store.dispatch(showNotification({ severity: 'info', detail: 'Sync cancelled' }));
						break;
				}

			}
		});

	}

	onClear(): void {

		this.store.dispatch(clearSyncLogs());

	}

	onSyncIndex(syncLogId: ISODateString): void {

		this.store.dispatch(loadSyncMessages({ syncLogId }));

	}

}