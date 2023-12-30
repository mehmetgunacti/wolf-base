import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NoteContent } from 'lib/models';
import { BehaviorSubject, Observable, Subject, combineLatest, concat, concatMap, from, map } from 'rxjs';
import { DOMService } from 'services';

declare global {
	interface Window {
		markdownit: any;
		hljs: any;
	}
}

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrls: ['./note-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	private subjectContent: Subject<string | null> = new Subject<string | null>();
	private subjectMD: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private domService: DOMService = inject(DOMService);
	private readonly document: Document = inject(DOCUMENT);

	@Input() set content(nc: NoteContent | null) {

		this.subjectContent.next(nc?.content ?? null);

	}

	result$: Observable<string | null> = combineLatest([
		this.subjectContent.asObservable(),
		this.subjectMD.asObservable()
	]).pipe(

		map(([content, loaded]) => {

			if (!content || !loaded)
				return null;

			const hljs = this.document.defaultView?.hljs;

			const config = {

				html: true,
				breaks: true,
				linkify: true,
				typographer: true,
				highlight: function (str: string, lang: string) {

					if (lang && hljs.getLanguage(lang)) {
						try {
							return hljs.highlight(str, { language: lang }).value;
						} catch (e) {
							console.error(e);
							throw new Error('highlight-js related error occured!');
						}
					}
					return ''; // use external default escaping

				}

			};
			const md = this.document.defaultView?.markdownit(config);
			return md.render(content);

		})

	);

	constructor() {

		const styleUrls = [
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css',
		];
		const scriptUrls = [
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/java.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/typescript.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/sql.min.js',
			'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
		]

		concat(

			from(styleUrls).pipe(
				concatMap(url => this.domService.appendLinkToHead(url))
			),
			from(scriptUrls).pipe(
				concatMap(url => this.domService.appendScriptToBody(url))
			)

		).subscribe({

			complete: () => {

				const hljs = this.document.defaultView?.hljs;
				const md = this.document.defaultView?.markdownit();
				if (!md)
					throw new Error('markdown-it not in window scope!');
				this.subjectMD.next(true);

			}

		});

	}

}
