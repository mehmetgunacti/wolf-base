import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StatsSummary } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() downloadRemoteNew = new EventEmitter<void>();
	@Output() uploadLocalNew = new EventEmitter<void>();
	@Output() uploadLocalClicked = new EventEmitter<void>();
	@Output() viewRemoteDeleted = new EventEmitter<void>();
	@Output() viewRemoteUpdated = new EventEmitter<void>();
	@Output() uploadLocalUpdated = new EventEmitter<void>();
	@Output() uploadLocalDeleted = new EventEmitter<void>();
	@Output() viewErrors = new EventEmitter<void>();

	onDownloadRemoteNew(): void {

		this.downloadRemoteNew.emit();

	}

	onUploadLocalNew(): void {

		this.uploadLocalNew.emit();

	}

	onUploadLocalClicked(): void {

		this.uploadLocalClicked.emit();

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

	onViewErrors(): void {

		this.viewErrors.emit();

	}

}