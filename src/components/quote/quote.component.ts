import { Component, input } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Quote } from '@models/quote.model';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './quote.component.html',
	host: {
		'class': 'relative grid p-3 md:p-4 comp comp-dark min-h-40 text-content @container group'
	}
})
export class QuoteComponent extends BaseComponent {

	protected EMPTY_QUOTE: Quote = { id: 'dummy', name: '', author: null, context: null };

	quote = input<Quote | null>();

}
