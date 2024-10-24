import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-words-page',
	standalone: true,
	imports: [],
	templateUrl: './words-page.component.html',
	styleUrl: './words-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsPageComponent {

}
