import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';

@Component({
	selector: 'w-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

	@Input() control!: FormControl;
	@Input() name: string = '';
	@Input() type: string = 'text';
	@Input() readonly = false;
	@Input() labelUp: boolean | null = null;

	@Output() inputChanged: EventEmitter<string> = new EventEmitter();

	hasValue$!: Observable<boolean>;

	ngOnInit(): void {

		// todo : what if labelUp changes?
		this.hasValue$ = this.labelUp ? of(true) : this.control.valueChanges.pipe(

			startWith(this.control.value),
			map(val => this.hasValue(val))

		);

	}

	private hasValue(val: any): boolean {

		switch(this.type) {

			case 'text': return  !!val;
			case 'date': return !!val;
			case 'search': return !!val;
			case 'number': return typeof val === 'number' && Number.isFinite(Number(val));

		}
		throw new Error('[Not implemented] val is of type ' + (typeof val));

	}

	onInput(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		this.inputChanged.emit(value);

	}

}
