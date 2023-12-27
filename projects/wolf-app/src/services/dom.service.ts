import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DOMService {

	private readonly document: Document = inject(DOCUMENT);

	appendLinkToHead(url: string): Observable<string> {

		const existing = this.checkLinkElement(url);
		if (existing) {

			console.info(`${url} already loaded.`);
			return of(url); // dummy value

		}

		console.info(`Appending to <head>: ${url}`);
		const [el, subject] = this.createLink(url);
		this.document.head.appendChild(el);
		return subject.asObservable();

	}

	removeLinkFromHead(href: string): void {

		const head = this.document.head;
		const linkElements = head.querySelectorAll(`link[href="${href}"]`);
		linkElements.forEach(el => head.removeChild(el));

	}

	private checkLinkElement(href: string): boolean {

		const head = this.document.head;
		return !!head.querySelector(`link[href="${href}"]`);

	}

	private createLink(href: string): [HTMLLinkElement, Subject<string>] {

		const subject = new Subject<string>();
		const el: HTMLLinkElement = this.document.createElement('link');
		el.rel = 'stylesheet';
		el.type = 'text/css';
		el.onload = () => {
			subject.next(href); // dummy value
			subject.complete();
		};
		el.onerror = (ev) => subject.error(ev);
		el.href = href;
		return [el, subject];

	}

	appendScriptToBody(src: string): Observable<string> {

		const existing = this.checkScriptElement(src);
		if (existing) {

			console.info(`${src} already loaded.`);
			return of(src); // dummy value

		}

		console.info(`Appending to <body>: ${src}`);
		const [el, subject] = this.createScript(src);
		this.document.body.appendChild(el);
		return subject.asObservable();

	}

	private checkScriptElement(src: string): boolean {

		const body = this.document.body;
		return !!body.querySelector(`script[src="${src}"]`);

	}

	private createScript(src: string): [HTMLScriptElement, Subject<string>] {

		const subject = new Subject<string>();
		const el: HTMLScriptElement = this.document.createElement('script');
		el.type = 'text/javascript';
		el.src = src;
		el.async = true;
		el.defer = true;
		el.onload = () => {
			subject.next(src); // dummy value
			subject.complete();
		};
		el.onerror = (ev) => subject.error(ev);
		return [el, subject];

	}

}
