import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	template: '',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class BaseComponent {

	private static idCounter = 0;
	protected readonly componentId = `${this.constructor.name}_${++BaseComponent.idCounter}`;

}
