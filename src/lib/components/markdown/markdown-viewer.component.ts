import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { SanitizeHtmlPipe } from '@pipes';
import { BaseComponent } from '../base.component';
import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';

@Component({
	selector: 'w-markdown-viewer',
	standalone: true,
	imports: [ MarkdownToHtmlPipe, SanitizeHtmlPipe ],
	templateUrl: './markdown-viewer.component.html',
	styleUrls: [ './markdown-viewer.component.scss' ]
})
export class MarkdownViewerComponent extends BaseComponent implements AfterViewInit {

	@Input() markdown: string | null = null;

	private document: Document = inject(DOCUMENT);

	ngAfterViewInit(): void {

		setTimeout(() => {

			if (this.addTocHeading())
				this.addClickListeners();

		}, 100);

	}

	private addTocHeading(): boolean {

		const navs: NodeListOf<HTMLElement> = this.document.querySelectorAll('nav.table-of-contents');
		if (navs.length === 0)
			return false;

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

}
