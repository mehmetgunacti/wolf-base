import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, Renderer2, inject } from '@angular/core';
import { Note, NoteContent } from 'lib/models';
import { Observable, Subject, map } from 'rxjs';
import { MarkdownService } from 'services/markdown.service';

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrl: './note-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent implements AfterViewInit {

	// private subjectContent: Subject<string | null> = new Subject<string | null>();

	// private markdownService: MarkdownService = inject(MarkdownService);
	private renderer: Renderer2 = inject(Renderer2);
	private document: Document = inject(DOCUMENT);

	@Input() note: Note | null | undefined;

	@Input() content: NoteContent | null | undefined;

	// result$: Observable<string | null> = this.subjectContent.asObservable().pipe(

	// 	map(content => this.markdownService.render(content))

	// );

	ngAfterViewInit(): void {

		setTimeout(() => {

			if (this.addTocHeading())
				this.addClickListeners();

		}, 100);

	}

	private addTocHeading(): boolean {

		const navs: NodeListOf<HTMLElement> = this.document.querySelectorAll('nav.table-of-contents');
		if (navs.length === 0) {
			console.log('returning false');

			return false;
		}

		const tocTitle = this.document.createElement("h3");
		const titleText = this.document.createTextNode("Table of Contents");
		tocTitle.appendChild(titleText);

		navs.forEach(nav => {

			const firstChild = nav.firstChild;
			nav.insertBefore(tocTitle.cloneNode(true), firstChild);

		});
		return true;

	}

	private addClickListeners(): void {

		const anchors: NodeListOf<HTMLAnchorElement> = this.document.querySelectorAll('nav.table-of-contents a');
		anchors.forEach(anchor => {

			const href = anchor.getAttribute('href');
			if (href && href.startsWith("#")) {

				anchor.addEventListener('click', event => {

					event.preventDefault();
					const target = this.document.getElementById(href.substring(1));
					if (target)
						target.scrollIntoView({ behavior: 'smooth' });

				});

			}

		});

	}

	toConsole(): void {

		console.log('this is console');

	}

}
