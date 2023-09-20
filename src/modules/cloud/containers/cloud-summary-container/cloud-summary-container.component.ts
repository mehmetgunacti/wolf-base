import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloudTask } from 'lib';
import { Observable } from 'rxjs';
import { selBookmarkCloudTasks } from 'store/selectors/cloud-bookmark.selectors';

@Component({
	selector: 'app-cloud-summary-container',
	templateUrl: './cloud-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudSummaryContainerComponent {

	private store: Store = inject(Store);

	tasks$: Observable<CloudTask[]>;

	constructor() {

		this.tasks$ = this.store.select(selBookmarkCloudTasks);

	}

	onAction(): void {

		console.log('action');

	}

}