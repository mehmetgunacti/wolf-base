import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-word-page',
	templateUrl: './word-page.component.html',
	styleUrls: ['./word-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordPageComponent { }
