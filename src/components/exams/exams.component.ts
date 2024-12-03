import { Component, input, output, signal } from '@angular/core';
import { slideDownTrigger } from '@animations/slide-in-out.animation';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Exam } from '@models/test-suite.model';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'app-exams',
	templateUrl: './exams.component.html',
	animations: [ slideDownTrigger ],
	host: {
		'class': 'flex flex-col'
	}
})
export class ExamsComponent extends BaseComponent {

	// Input
	exams = input.required<Exam[]>();

	// Output
	openFormDialog = output<void>();
	openEditDialog = output<UUID>();

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

}
