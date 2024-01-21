import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'w-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {

	@Input()
	@HostBinding('class.onlyBigScreen')
	showOnlyOnBigScreen: boolean = false;

	@Input()
	@HostBinding('style.--show-after')
	showContentAfter: string = "0px";

}
