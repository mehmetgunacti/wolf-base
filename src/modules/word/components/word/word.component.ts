import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { Definition, UUID, Word, elseEmptyArray } from '@lib';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {

	word: InputSignal<Word> = input.required();
	scheduledIds = input<UUID[], UUID[] | null>([], { transform: elseEmptyArray });

	@Output() schedule: EventEmitter<Definition> = new EventEmitter();
	@Output() cancel: EventEmitter<Definition> = new EventEmitter();

	onSchedule(definition: Definition, checked: boolean): void {

		if (checked)
			this.schedule.emit(definition);
		else
			this.cancel.emit(definition);

	}

}
