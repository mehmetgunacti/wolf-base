import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'words-page',
	standalone: true,
	imports: [],
	template: `
		<p>words-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsPage { }
