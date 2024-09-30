import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selWord_filtered } from 'store/selectors/word/word-ui.selectors';

@Component({
	selector: 'app-words-container',
	templateUrl: './words-container.component.html',
	styleUrls: ['./words-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsContainerComponent {

	private words = inject(Store).selectSignal(selWord_filtered);
	protected sortedWords = computed(() => this.words().sort((a, b) => a.name.localeCompare(b.name)));

}
