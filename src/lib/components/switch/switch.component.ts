import { ChangeDetectionStrategy, Component, ModelSignal, model } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'w-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {

	checked: ModelSignal<boolean> = model.required<boolean>();

}
