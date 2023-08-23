import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, RemoteData, StatsSummary, UUID } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() downloadRemoteNew = new EventEmitter<void>();
	@Output() uploadLocalNew = new EventEmitter<void>();

	onDownloadRemoteNew(): void {

		this.downloadRemoteNew.emit();

	}

	onUploadLocalNew(): void {

		this.uploadLocalNew.emit();

	}

	onDeleteRemote(): void {

	}

	onOverrideLocal(): void {

	}

	onOverrideRemote(): void {

	}

	onLoadRemote(): void {

	}

}