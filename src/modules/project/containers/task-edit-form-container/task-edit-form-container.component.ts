import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { NameBase, Task, UUID } from 'lib';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeEditDialog, create, openTaskDialog, update } from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';
import { selTask_distinctTagNames } from 'store/selectors/project-task-selectors/task-tags.selectors';
import { selTask_selected } from 'store/selectors/project-task-selectors/task-ui.selectors';

@Component({
	selector: 'app-task-edit-form-container',
	templateUrl: './task-edit-form-container.component.html',
	styleUrls: ['./task-edit-form-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormContainerComponent {

	private store: Store = inject(Store);

	tagInput = new Subject<string | null>();

	task: Signal<Task | null>;
	project: Signal<NameBase | null>;
	tagSuggestions$!: Observable<string[]>;

	constructor() {

		this.task = this.store.selectSignal(selTask_selected);
		this.project = this.store.selectSignal(selProject_selected);

	}

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(selTask_distinctTagNames),
			this.tagInput
		]).pipe(

			map(([tags, tagInput]) => {

				if (!!tagInput)
					return tags.filter(t => t.startsWith(tagInput));
				return [];

			})

		);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(create({ task }));

	}

	onUpdate(id: UUID, task: Partial<Task>): void {

		this.store.dispatch(update({ id, task }));

	}

	onCancel(id: UUID): void {

		this.store.dispatch(openTaskDialog({ id }));

	}

	onClose(): void {

		this.store.dispatch(closeEditDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
