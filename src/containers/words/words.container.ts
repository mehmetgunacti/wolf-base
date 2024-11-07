import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selWord_filtered } from '@selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective ],
	selector: 'app-words-container',
	templateUrl: './words.container.html',
	host: { 'class': 'comp p-4' }
})
export class WordsContainer extends BaseComponent {

	private words = inject(Store).selectSignal(selWord_filtered);
	protected sortedWords = computed(() => this.words().sort((a, b) => a.name.localeCompare(b.name)));

}
