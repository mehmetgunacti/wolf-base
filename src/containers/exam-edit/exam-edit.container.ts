import { entityActions } from '@actions/entity.actions';
import { taskActions } from '@actions/project-task.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Bookmark } from '@models/bookmark.model';
import { Task } from '@models/project.model';
import { Store } from '@ngrx/store';
import { selTask_editEntity } from '@selectors/task/task-ui.selectors';

@Component({
	standalone: true,
	imports: [ GlyphDirective, AsyncPipe ],
	selector: 'app-exam-edit-container',
	templateUrl: './exam-edit.container.html',
	host: { 'class': 'h-full flex flex-col p-2 pt-1 md:pt-3 md:p-4' },
})
export class ExamEditContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected test = this.store.selectSignal(selTask_editEntity);

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.task, entity: task }));

	}

	onUpdate(id: UUID, task: Partial<Bookmark>) {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.task, id, entity: task }));

	}

	onClose(): void {

		this.store.dispatch(taskActions.closeEditDialog());

	}

}
