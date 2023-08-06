import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { AsyncZippable, FlateError, zip } from 'fflate';
import * as FileSaver from 'file-saver-es';
import { Bookmark, IDBase, LocalStorageService } from 'lib';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { showNotification } from 'store/actions/core-notification.actions';
import { clearMessages, syncTrigger } from 'store/actions/sync.actions';
import { messages } from 'store/selectors/sync.selectors';

const toUint8Array = <T extends IDBase>(data: T[]): Uint8Array => {

	const content: string[] = data.map(item => JSON.stringify(item));
	const json = '[\r\n' + content.join('\r\n') + ',\r\n]';
	return new TextEncoder().encode(json);

}

@Component({
	selector: 'app-sync-synchronize-container',
	templateUrl: './sync-synchronize-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSynchronizeContainerComponent {

	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
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

				await this.generateZip();
				this.store.dispatch(syncTrigger());

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

	async generateZip(): Promise<void> {

		const bookmarks: Bookmark[] = await this.localStorage.bookmarks.list();
		const bookmark_trash: Bookmark[] = await this.localStorage.bookmarks.listDeletedItems();

		const zippable: AsyncZippable = {
			'bookmark.json': toUint8Array(bookmarks),
			'bookmark_deleted.json': toUint8Array(bookmark_trash)
		};

		return new Promise((resolve, reject) => {

			zip(zippable, { level: 9 }, async (err: FlateError | null, data: Uint8Array) => {

				if (err) {

					reject(err.message);
					return;

				}

				// Generate the zip file
				const content: Blob = new Blob([data], { type: 'application/zip' });

				// save zip file
				FileSaver.saveAs(content, `backup_${new Date().toISOString()}.zip`);
				resolve();

			});

		});

	}

	onClear(): void {

		this.store.dispatch(clearMessages());

	}

}