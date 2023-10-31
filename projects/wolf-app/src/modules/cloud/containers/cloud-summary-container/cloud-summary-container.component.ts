import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloudTask, CloudTaskType, WolfEntity } from 'lib';
import { Observable } from 'rxjs';
import { cloudTaskAction } from 'store/actions/cloud.actions';
import { selBookmarkCloudTasks } from 'store/selectors/cloud-bookmark.selectors';

@Component({
	selector: 'app-cloud-summary-container',
	templateUrl: './cloud-summary-container.component.html',
	styleUrls: ['./cloud-summary-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudSummaryContainerComponent {

	private store: Store = inject(Store);

	tasks$: Observable<CloudTask[]>;

	constructor() {

		this.tasks$ = this.store.select(selBookmarkCloudTasks);

	}

	onAction([entity, taskType]: [WolfEntity, CloudTaskType]): void {

		this.store.dispatch(cloudTaskAction({ entity, taskType }));

	}

}
