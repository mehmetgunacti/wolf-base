import { Component, DestroyRef, EventEmitter, InputSignal, OnInit, Output, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

export const fcBoolean = () => new FormControl<boolean>(false, { nonNullable: true });

@Component({
	selector: 'w-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss'
})
export class SwitchComponent implements OnInit {

	control = input(fcBoolean(), { transform: (fc: FormControl<boolean> | null | undefined): FormControl<boolean> => fc ?? fcBoolean() });
	checked = input(false);

	destroyRef = inject(DestroyRef);

	@Output() on: EventEmitter<boolean> = new EventEmitter();
	@Output() off: EventEmitter<boolean> = new EventEmitter();

	constructor() {

		effect(() => {

			const checked = this.checked();
			this.control().setValue(checked);

		});

	}

	ngOnInit(): void {

		this.control().valueChanges.pipe(
			takeUntilDestroyed(this.destroyRef)
		).subscribe(val => {

			if (val)
				this.on.emit();
			else
				this.off.emit();

		});

	}

}
