import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NoteContent } from 'lib/models';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { DOMService } from 'services';

declare global {
	interface Window {
		markdownit: any;
	}
}

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrls: ['./note-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	private subjectContent: Subject<string> = new Subject<string>();
	private subjectMD: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	@Input() set content(nc: NoteContent | null) {

		if (nc)
			this.subjectContent.next(nc.content);

	}

	private domService: DOMService = inject(DOMService);
	private readonly document: Document = inject(DOCUMENT);

	result$: Observable<string | null> = combineLatest([
		this.subjectContent.asObservable(),
		this.subjectMD.asObservable()
	]).pipe(

		map(([content, loaded]) => {

			if (!content || !loaded)
				return null;

			const config = {
				breaks: true,
				linkify: true
			};
			const md = this.document.defaultView?.markdownit(config);
			return md.render(content);

		})

	);

	constructor() {

		this.domService
			.appendScriptToBody('https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js')
			.subscribe({
				complete: () => {

					const md = this.document.defaultView?.markdownit();
					if (!md)
						throw new Error('markdown-it not in window scope!');
					this.subjectMD.next(true);

				}
			});

	}

}
