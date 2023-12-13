import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeConflictDialog, startSync } from 'store/actions/cloud.actions';
import { selCloudConflictDialogTitle, selCloudIsConflictDialogVisible } from 'store/selectors/cloud-ui.selectors';
import { selCoreIsFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-cloud-page',
	templateUrl: './cloud-page.component.html',
	styleUrls: ['./cloud-page.component.scss']
})
export class CloudPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;
	isConflictDialogVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;
	dialogTitle$: Observable<string | null>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(selCoreIsFirestoreConfigMissing);
		this.isConflictDialogVisible$ = this.store.select(selCloudIsConflictDialogVisible);
		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);
		this.dialogTitle$ = this.store.select(selCloudConflictDialogTitle);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(startSync());

	}

	closeConflictDialog(): void {

		this.store.dispatch(closeConflictDialog());

	}

}
