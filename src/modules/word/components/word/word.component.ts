import { ChangeDetectionStrategy, Component, EventEmitter, InputSignal, OnInit, Output, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Definition, UUID, Word, elseEmptyArray } from '@lib';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit {

	controls: Record<UUID, FormControl<boolean>> = {};

	word: InputSignal<Word> = input.required();
	scheduledIds = input<UUID[], UUID[] | null>([], { transform: elseEmptyArray });

	@Output() schedule: EventEmitter<Definition> = new EventEmitter();
	@Output() cancel: EventEmitter<Definition> = new EventEmitter();

	ngOnInit(): void {

		this.word().definitions.forEach(d => {

			this.controls[d.id] = new FormControl<boolean>(this.scheduledIds().includes(d.id), { nonNullable: true });

		});

	}

	onSchedule(definition: Definition): void {

		this.schedule.emit(definition);

	}

	onCancel(definition: Definition): void {

		this.cancel.emit(definition);

	}

}
