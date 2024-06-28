import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
	selector: 'w-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent implements OnInit {

	label_id: string = 'textarea_' + Math.random();

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() readonly: boolean = false;
	@Input() rows: number = 10;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();

	hasValue$!: Observable<boolean>;

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			map(val => !!val),


		);

	}

	onInput(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		this.inputChanged.emit(value);

	}

}
