import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { CloudTask, SyncTaskType } from '@models/cloud.model';

function toAction(type: SyncTaskType): 'upload' | 'download' | 'view' {

	switch (type) {

		case SyncTaskType.local_new:
		case SyncTaskType.local_updated:
		case SyncTaskType.local_deleted:
		case SyncTaskType.clicked:
			return 'upload';

		case SyncTaskType.remote_new:
		case SyncTaskType.remote_updated:
		case SyncTaskType.remote_deleted:
		case SyncTaskType.deleted_deleted:
			return 'download';

		case SyncTaskType.updated_updated:
		case SyncTaskType.updated_deleted:
		case SyncTaskType.deleted_updated:
			return 'view';

	}

}

@Component({
	imports: [ GlyphDirective, RouterLink ],
	selector: 'app-cloud-task',
	templateUrl: './cloud-task.component.html'
})
export class CloudTaskComponent extends BaseComponent {

	protected EntityType = AppEntityType;
	protected CloudTaskType = SyncTaskType;

	// Input
	task = input.required<CloudTask>();

	actionType = computed(() => toAction(this.task().type));

	// Output
	action = output<CloudTask>();

	onActionClicked(): void {

		this.action.emit(this.task());

	}

}
