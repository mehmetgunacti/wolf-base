import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { showNotification } from 'store/actions/core-notification.actions';
import { clearMessages, syncBackupDatabase, syncTrigger } from 'store/actions/sync.actions';
import { messages } from 'store/selectors/sync.selectors';

@Component({
	selector: 'app-sync-synchronize-container',
	templateUrl: './sync-synchronize-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSynchronizeContainerComponent {

	private store: Store = inject(Store);
	private confirmationService: ConfirmationService = inject(ConfirmationService);

	messages$: Observable<string[]>;

	constructor() {

		this.messages$ = this.store.select(messages);

	}

	onStart(): void {

		this.confirmationService.confirm({

			message: 'Download (backup) local database?',
			header: 'Confirmation',
			icon: 'pi pi-question-circle',
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

		this.store.dispatch(clearMessages());

	}

}