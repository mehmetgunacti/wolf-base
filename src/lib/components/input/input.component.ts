import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit, output } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
	selector: 'w-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

	// @Input()
	control: InputSignal<FormControl> = input.required();
	name: InputSignal<string> = input.required();
	type: InputSignal<string> = input('text');
	readonly: InputSignal<boolean> = input(false);
	labelUp: InputSignal<boolean | undefined> = input();

	// @Output()
	inputChanged = output<string>();

	labelUp$ = toObservable(this.labelUp);
	hasValue$!: Observable<boolean>;

	ngOnInit(): void {

		this.hasValue$ = combineLatest([
			this.labelUp$,
			this.control().valueChanges.pipe(

				startWith(this.control().value),
				map(val => this.validate(val))

			)
		]).pipe(
			map(([labelUp, control]) => labelUp ?? control)
		);

	}

	private validate(val: string): boolean {

		switch (this.type()) {

			case 'text': return !!val;
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
