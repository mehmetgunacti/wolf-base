import { Component, ModelSignal, model } from '@angular/core';
import { FormControl } from '@angular/forms';

export const fcBoolean = () => new FormControl<boolean>(false, { nonNullable: true });

@Component({
	selector: 'w-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss'
})
export class SwitchComponent {

	checked: ModelSignal<boolean> = model.required<boolean>();

}
