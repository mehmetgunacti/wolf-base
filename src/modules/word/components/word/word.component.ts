import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { UUID, Word, elseEmptyArray } from '@lib';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {

	word: InputSignal<Word> = input.required();
	scheduledIds: InputSignal<UUID[], UUID[] | null> = input([], { transform: elseEmptyArray });

	@Output() schedule: EventEmitter<UUID> = new EventEmitter();
	@Output() cancel: EventEmitter<UUID> = new EventEmitter();

	onSchedule(definitionId: UUID): void {

		console.log('onSchedule', definitionId);
		this.schedule.emit(definitionId);

	}

	onCancel(definitionId: UUID): void {

		console.log('onCancel', definitionId);
		this.cancel.emit(definitionId);

	}

}
