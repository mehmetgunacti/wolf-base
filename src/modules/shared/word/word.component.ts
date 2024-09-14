import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Definition, UUID, Word, elseEmptyArray } from '@lib';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {

	word = input.required<Word>();
	scheduledIds = input<UUID[], UUID[] | null>([], { transform: elseEmptyArray });
	schedulable = input<boolean, boolean | null>(true, { transform: s => s === null ? true : s });

	schedule = output<Definition>();
	cancelSchedule = output<Definition>();

	onSchedule(definition: Definition, checked: boolean): void {

		if (checked)
			this.schedule.emit(definition);
		else
			this.cancelSchedule.emit(definition);

	}

}
