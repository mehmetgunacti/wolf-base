import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, RemoteData, StatsSummary, UUID } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() downloadRemoteIds = new EventEmitter<void>();

	onDownloadRemoteIds(): void {

		this.downloadRemoteIds.emit();

	}

	onDeleteLocal(): void {

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