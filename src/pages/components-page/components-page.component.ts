import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	standalone: true,
	imports: [],
	templateUrl: './components-page.component.html',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent {


}
