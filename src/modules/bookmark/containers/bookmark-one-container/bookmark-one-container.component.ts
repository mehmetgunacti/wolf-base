import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ID, Bookmark } from 'lib';
import { ConfirmationService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import * as actions from 'store';
import * as selectors from 'store';

@Component({
	selector: 'app-bookmark-one-container',
	templateUrl: './bookmark-one-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkOneContainerComponent {

	bookmark$: Observable<Bookmark>;

	constructor(
		private store: Store,
		private confirmationService: ConfirmationService
	) {

		this.bookmark$ = of({} as Bookmark); // store.select(selectors.activeEntity);

	}

	onRefresh(id: ID): void {

		// this.store.dispatch(
		// 	actions.loadEntity({
		// 		entity: Entities.bookmarks,
		// 		id,
		// 		skipCache: true
		// 	})
		// );

	}

	onDelete(id: ID, btn: HTMLButtonElement): void {

		this.confirmationService.confirm({
			target: btn,
			message: 'Are you sure that you want to proceed?',
			icon: 'pi pi-exclamation-triangle',
			acceptButtonStyleClass: 'p-button-danger',
			acceptLabel: 'Delete',
			accept: () => console.log('this.store.dispatch(actions.deleteEntity({ entity: Entities.bookmarks, id }))')
		});

	}

}
