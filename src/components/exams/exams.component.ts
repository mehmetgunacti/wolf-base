import { Component, input, output, signal } from '@angular/core';
import { slideDownEnterLeaveTrigger, slideDownTrigger } from '@animations/slide-in-out.animation';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Exam } from '@models/test-suite.model';
import { HideEnumPipe } from '@pipes/hide-enum.pipe';
import { sortByName } from '@utils/array.util';

@Component({
	standalone: true,
	imports: [ GlyphDirective, HideEnumPipe ],
	selector: 'app-exams',
	templateUrl: './exams.component.html',
	animations: [ slideDownTrigger, slideDownEnterLeaveTrigger ],
	host: {
		'class': 'flex flex-col'
	}
})
export class ExamsComponent extends BaseComponent {

	// Input
	exams = input.required<Exam[], Exam[]>({ transform: sortByName });

	// Output
	openFormDialog = output<void>();
	openEditDialog = output<UUID>();
	openDetailsDialog = output<UUID>();
	openSessionDialog = output<UUID>();

	protected testsExpanded = signal<Record<UUID, boolean>>({});

	protected onToggleTest(id: UUID): void {

		this.testsExpanded.update(map => { map[ id ] = !map[ id ]; return map; });

	}

	protected onOpenFormDialog(): void {

		this.openFormDialog.emit();

	}

	protected onOpenEditDialog(id: UUID): void {

		this.openEditDialog.emit(id);

	}

	protected onOpenDetailsDialog(id: UUID): void {

		this.openDetailsDialog.emit(id);

	}

	protected onSessionDialog(id: UUID): void {

		this.openSessionDialog.emit(id);

	}

}
