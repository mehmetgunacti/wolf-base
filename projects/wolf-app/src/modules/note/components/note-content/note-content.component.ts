import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NoteContent } from 'lib/models';
import { Observable, delay, map, tap } from 'rxjs';
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
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent implements AfterViewInit {

	@Input() content: NoteContent | null | undefined;

	private domService: DOMService = inject(DOMService);
	private readonly document: Document = inject(DOCUMENT);

	result$: Observable<string>;

	constructor() {

		this.result$ = this.domService.appendScriptToBody('https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js')
			.pipe(
				delay(1000),
				tap(url => console.info(`${url} loaded`)),
				map(() => {

					const md = this.document.defaultView?.markdownit();
					if (!md)
						throw new Error('markdown-it could not be found in window scope!');

					return md.render(this.content?.content ?? 'to be changed2');

				})
			);

	}

	ngAfterViewInit(): void {

	}

}
