import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeConflictDialog } from 'store/actions/cloud.actions';
import { downloadRemoteMetadata } from 'store/actions/entity.actions';
import { selCloudConflictDialogTitle, selCloudIsConflictDialogVisible } from 'store/selectors/cloud/cloud-ui.selectors';
import { selCore_isFirestoreConfigMissing } from 'store/selectors/core/core-configuration.selectors';
import { selCore_isBigScreen } from 'store/selectors/core/core-ui.selectors';

@Component({
	selector: 'app-cloud-page',
	templateUrl: './cloud-page.component.html',
	styleUrls: ['./cloud-page.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;
	isConflictDialogVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;
	dialogTitle$: Observable<string | null>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(selCore_isFirestoreConfigMissing);
		this.isConflictDialogVisible$ = this.store.select(selCloudIsConflictDialogVisible);
		this.isBigScreen$ = this.store.select(selCore_isBigScreen);
		this.dialogTitle$ = this.store.select(selCloudConflictDialogTitle);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(downloadRemoteMetadata());

	}

	closeConflictDialog(): void {

		this.store.dispatch(closeConflictDialog());

	}

}
