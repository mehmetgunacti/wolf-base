import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-words-page',
	templateUrl: './words-page.component.html',
	styleUrls: ['./words-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsPageComponent { }
