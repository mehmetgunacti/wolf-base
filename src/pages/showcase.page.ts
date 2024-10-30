import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'showcase-page',
	standalone: true,
	imports: [],
	template: `
		<p>showcase-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcasePage { }
