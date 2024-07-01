import { Component, DestroyRef, EventEmitter, InputSignal, OnInit, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';

export const fcBoolean = () => new FormControl<boolean>(false, { nonNullable: true });

@Component({
	selector: 'w-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss'
})
export class SwitchComponent implements OnInit {

	control: InputSignal<FormControl<boolean>> = input.required<FormControl<boolean>>();

	destroyRef = inject(DestroyRef);

	@Output() on: EventEmitter<boolean> = new EventEmitter();
	@Output() off: EventEmitter<boolean> = new EventEmitter();

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
