import { Component, input } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Quote } from '@models';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './quote.component.html',
	host: {
		'class': 'absolute inset-3 md:inset-4 grid overflow-y-auto scrollbar scrollbar-dark'
	}
})
export class QuoteComponent extends BaseComponent {

	quote = input.required<Quote>();

}
