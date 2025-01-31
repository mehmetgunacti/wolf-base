import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { ChoicesViewerComponent } from '@libComponents/choices/choices-viewer.component';
import { MarkdownViewerComponent } from '@libComponents/markdown/markdown-viewer.component';
import { Exam, Session } from '@models/test-suite.model';

@Component({
	imports: [ ChoicesViewerComponent, DatePipe, MarkdownViewerComponent ],
	selector: 'app-exam-details',
	templateUrl: './exam-details.component.html',
	host: {
		'class': 'flex flex-col gap-1 md:gap-2'
	}
})
export class ExamDetailsComponent extends BaseComponent {

	// Input
	exam = input.required<Exam>();
	sessions = input<Session[]>([]);

	protected sortedSessions = computed(() => [ ...this.sessions() ].sort((a, b) => a.start.localeCompare(b.start)));

}
