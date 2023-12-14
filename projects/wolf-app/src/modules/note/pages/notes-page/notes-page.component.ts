import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromClipboard } from 'store/actions/note.actions';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-notes-page',
	templateUrl: './notes-page.component.html',
	styleUrls: ['./notes-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPageComponent {

	isBigScreen$: Observable<boolean>;

	private store: Store = inject(Store);

	constructor() {

		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);

	}

	openAddDialog(): void {



	}

	fromClipboard(): void {

		this.store.dispatch(fromClipboard());

	}

}
