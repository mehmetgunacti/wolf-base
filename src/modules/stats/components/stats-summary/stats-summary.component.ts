import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StatsSummary } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() uploadLocalNew = new EventEmitter<void>();
	@Output() downloadRemoteNew = new EventEmitter<void>();

	@Output() uploadLocalClicked = new EventEmitter<void>();
	@Output() downloadRemoteClicks = new EventEmitter<void>();

	@Output() viewRemoteDeleted = new EventEmitter<void>();
	@Output() viewRemoteUpdated = new EventEmitter<void>();

	@Output() uploadLocalUpdated = new EventEmitter<void>();
	@Output() uploadLocalDeleted = new EventEmitter<void>();

	@Output() deleteLocalMetadata = new EventEmitter<void>();

	@Output() viewLocalUpdatedRemoteUpdated = new EventEmitter<void>();
	@Output() viewLocalUpdatedRemoteDeleted = new EventEmitter<void>();
	@Output() viewLocalDeletedRemoteUpdated = new EventEmitter<void>();

	onDownloadRemoteNew(): void {

		this.downloadRemoteNew.emit();

	}

	onUploadLocalNew(): void {

		this.uploadLocalNew.emit();

	}

	onUploadLocalClicked(): void {

		this.uploadLocalClicked.emit();

	}

	onDownloadRemoteClicks(): void {

		this.downloadRemoteClicks.emit();

	}

	onViewRemoteDeleted(): void {

		this.viewRemoteDeleted.emit();

	}

	onViewRemoteUpdated(): void {

		this.viewRemoteUpdated.emit();

	}

	onUploadLocalUpdated(): void {

		this.uploadLocalUpdated.emit();

	}

	onUploadLocalDeleted(): void {

		this.uploadLocalDeleted.emit();

	}

	onViewUpdatedUpdated(): void {

		this.viewLocalUpdatedRemoteUpdated.emit();

	}

	onDeleteLocalMetadata(): void {

		this.deleteLocalMetadata.emit();

	}

	onViewUpdatedDeleted(): void {

		this.viewLocalUpdatedRemoteDeleted.emit();

	}

	onViewDeletedUpdated(): void {

		this.viewLocalDeletedRemoteUpdated.emit();

	}

}