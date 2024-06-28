import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'lib';
import { create } from 'store/actions/word.actions';

@Component({
	selector: 'app-word-new-form-container',
	templateUrl: './word-new-form-container.component.html',
	styleUrls: ['./word-new-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordNewFormContainerComponent {

	private store: Store = inject(Store);

	onCreate(word: Partial<Word>): void {

		this.store.dispatch(create({ word }));

	}

}
