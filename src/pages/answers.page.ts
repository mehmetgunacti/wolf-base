import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'answers-page',
	standalone: true,
	imports: [],
	template: `
		<p>answers-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersPage { }
