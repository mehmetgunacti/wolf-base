import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';

@Component({
	selector: 'answers-page',
	standalone: true,
	imports: [],
	template: `
		<p>answers-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class AnswersPage extends BaseComponent { }
