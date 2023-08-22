import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, RemoteData, StatsSummary, UUID } from 'lib';

@Component({
	selector: 'app-stats-summary',
	templateUrl: './stats-summary.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryComponent {

	@Input() summary: StatsSummary | undefined | null;

	@Output() deleteLocal = new EventEmitter<UUID>();
	@Output() deleteRemote = new EventEmitter<UUID>();
	@Output() overrideLocal = new EventEmitter<RemoteData<Entity>>();
	@Output() overrideRemote = new EventEmitter<Entity>();
	@Output() loadRemote = new EventEmitter<UUID>();

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