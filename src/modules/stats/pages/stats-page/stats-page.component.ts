import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { downloadRemoteMetadata } from 'store/actions/stats-bookmark.actions';
import { closeConflictDialog } from 'store/actions/stats.actions';
import { selCoreIsFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';
import { selStatsConflictDialogTitle, selStatsIsConflictDialogVisible } from 'store/selectors/stats-ui.selectors';

@Component({
	selector: 'app-stats-page',
	templateUrl: './stats-page.component.html'
})
export class StatsPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;
	isConflictDialogVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;
	dialogTitle$: Observable<string | null>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(selCoreIsFirestoreConfigMissing);
		this.isConflictDialogVisible$ = this.store.select(selStatsIsConflictDialogVisible);
		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);
		this.dialogTitle$ = this.store.select(selStatsConflictDialogTitle);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(downloadRemoteMetadata());

	}

	closeConflictDialog(): void {

		this.store.dispatch(closeConflictDialog());

	}

}