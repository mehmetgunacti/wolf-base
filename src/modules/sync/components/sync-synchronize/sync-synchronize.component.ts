import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISODateString, RemoteCollection, SyncLog, SyncMessage } from 'lib';

@Component({
	selector: 'app-sync-synchronize',
	templateUrl: './sync-synchronize.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSynchronizeComponent implements OnInit {

	@Input() syncLogs: SyncLog[] | undefined | null;
	@Input() syncMessages: SyncMessage[] | undefined | null;

	get messages(): Partial<Record<RemoteCollection, SyncMessage[]>> {

		return this.syncMessages?.reduce((acc, message) => {

			acc[message.collection] = acc[message.collection] ?? [];
			acc[message.collection]!.push(message);
			return acc;

		}, {} as Partial<Record<RemoteCollection, SyncMessage[]>>) ?? {};

	}

	@Output() start = new EventEmitter<void>();
	@Output() clear = new EventEmitter<void>();
	@Output() syncIndex = new EventEmitter<ISODateString>();

	ngOnInit(): void {

		if (this.syncLogs)
			this.syncIndex.emit(this.syncLogs[0].id);

	}

	onStart(): void {

		this.start.emit();

	}

	onClear(): void {

		this.clear.emit();

	}

	onOpen(event: { index: number, e: Event }): void {

		if (this.syncLogs)
			this.syncIndex.emit(this.syncLogs[event.index].id);

	}

}