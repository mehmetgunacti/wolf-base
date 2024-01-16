import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Note, NoteContent } from 'lib/models';
import { Observable, Subject, map } from 'rxjs';
import { MarkdownService } from 'services/markdown.service';

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrl: './note-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	private subjectContent: Subject<string | null> = new Subject<string | null>();

	private markdownService: MarkdownService = inject(MarkdownService);

	@Input() note: Note | null | undefined;

	@Input() set content(nc: NoteContent | null) {

		this.subjectContent.next(nc?.content ?? null);

	}

	result$: Observable<string | null> = this.subjectContent.asObservable().pipe(

		map(content => this.markdownService.render(content))

	);

}
