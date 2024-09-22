import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { slideUpDownTrigger } from '@lib';

@Component({
	selector: 'app-components-page',
	templateUrl: './components-page.component.html',
	styleUrls: ['./components-page.component.scss'],
	animations: [slideUpDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent {

	alertsVisible = signal<boolean>(true);
	buttonsVisible = signal<boolean>(false);

}
