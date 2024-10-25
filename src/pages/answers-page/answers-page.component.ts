import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-answers-page',
	standalone: true,
	imports: [],
	templateUrl: './answers-page.component.html',
	styleUrl: './answers-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersPageComponent {

}
