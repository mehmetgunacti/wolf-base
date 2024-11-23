import { entityActions } from '@actions/entity.actions';
import { taskActions } from '@actions/project-task.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { TaskForm } from '@forms/task/task.form';
import { BaseComponent } from '@libComponents/base.component';
import { Bookmark } from '@models/bookmark.model';
import { Task } from '@models/project.model';
import { Store } from '@ngrx/store';
import { selTask_distinctTagsArray } from '@selectors/task/task-tags.selectors';
import { selTask_editEntity } from '@selectors/task/task-ui.selectors';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ GlyphDirective, TaskForm, AsyncPipe ],
	selector: 'app-task-edit-container',
	templateUrl: './task-edit.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class TaskEditContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected task = this.store.selectSignal(selTask_editEntity);
	protected tagSuggestions$: Observable<string[]>;

	private tagInput = new Subject<string | null>();

	constructor() {

		super();
		this.tagSuggestions$ = combineLatest([
			this.store.select(selTask_distinctTagsArray),
			this.tagInput
		]).pipe(

			map(([ tags, tagInput ]) => {

				if (!!tagInput)
					return tags.filter(t => t.name.startsWith(tagInput)).map(t => t.name);
				return [];

			})

		);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.task, entity: task }));

	}

	onUpdate(id: UUID, task: Partial<Bookmark>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.task, id, entity: task }));

	}

	onClose(): void {

		this.store.dispatch(taskActions.closeEditDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
