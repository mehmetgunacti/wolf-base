import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

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

	hasValue$!: Observable<boolean>;

	ngOnInit(): void {

		this.hasValue$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			map(val => this.hasValue(val))

		);

	}

	private hasValue(val: any): boolean {

		switch(this.type) {

			case 'text': return  !!val;
			case 'number': return typeof val === 'number' && Number.isFinite(Number(val));

		}
		throw new Error('[Not implemented] val is of type ' + (typeof val));

	}

}
