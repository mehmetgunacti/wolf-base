import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SyncLog } from 'lib';

@Component({
	selector: 'app-sync-synchronize',
	templateUrl: './sync-synchronize.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSynchronizeComponent {

	@Input() syncLogs: SyncLog[] | undefined | null;

	@Output() start = new EventEmitter<void>();
	@Output() clear = new EventEmitter<void>();

	onStart(): void {

		this.start.emit();

	}

	onClear(): void {

		this.clear.emit();

	}

}