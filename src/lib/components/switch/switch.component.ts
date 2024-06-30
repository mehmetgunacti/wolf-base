import { Component, InputSignal, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'w-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss'
})
export class SwitchComponent {

	control: InputSignal<FormControl<boolean>> = input.required();

}
