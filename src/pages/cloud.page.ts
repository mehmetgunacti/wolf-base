import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'cloud-page',
	standalone: true,
	imports: [],
	template: `
		<p>cloud-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudPage { }
