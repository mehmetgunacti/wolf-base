import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StatsSummary } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() uploadNew = new EventEmitter<void>();
	@Output() downloadNew = new EventEmitter<void>();

	@Output() uploadClicks = new EventEmitter<void>();
	@Output() downloadClicks = new EventEmitter<void>();

	@Output() downloadDeleted = new EventEmitter<void>();
	@Output() downloadUpdated = new EventEmitter<void>();

	@Output() uploadUpdated = new EventEmitter<void>();
	@Output() uploadDeleted = new EventEmitter<void>();

	@Output() deleteLocalMetadata = new EventEmitter<void>();

	@Output() viewLocalUpdatedRemoteUpdated = new EventEmitter<void>();
	@Output() viewLocalUpdatedRemoteDeleted = new EventEmitter<void>();
	@Output() viewLocalDeletedRemoteUpdated = new EventEmitter<void>();

	onDownloadNew(): void {

		this.downloadNew.emit();

	}

	onUploadNew(): void {

		this.uploadNew.emit();

	}

	onUploadClicks(): void {

		this.uploadClicks.emit();

	}

	onDownloadClicks(): void {

		this.downloadClicks.emit();

	}

	onDownloadDeleted(): void {

		console.log('11111111');
		
		this.downloadDeleted.emit();

	}

	onDownloadUpdated(): void {

		this.downloadUpdated.emit();

	}

	onUploadUpdated(): void {

		this.uploadUpdated.emit();

	}

	onUploadDeleted(): void {

		this.uploadDeleted.emit();

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