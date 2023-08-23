import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { downloadRemoteMetadata } from 'store/actions/bookmark-sync.actions';
import { isFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';

@Component({
	selector: 'app-stats-page',
	templateUrl: './stats-page.component.html'
})
export class StatsPageComponent {

	private store: Store = inject(Store);

	isFirestoreConfigMissing$: Observable<boolean>;

	constructor() {

		this.isFirestoreConfigMissing$ = this.store.select(isFirestoreConfigMissing);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(downloadRemoteMetadata());

	}

}