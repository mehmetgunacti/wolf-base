import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DOMService {

	private readonly document: Document = inject(DOCUMENT);

	appendLinkToHead(url: string): Observable<number> {

		const existing = this.checkLinkElement(url);
		if (existing)
			return EMPTY;

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

	private createLink(href: string): [HTMLLinkElement, Subject<number>] {

		const subject = new Subject<number>();
		const el: HTMLLinkElement = this.document.createElement('link');
		el.rel = 'stylesheet';
		el.type = 'text/css';
		el.onload = () => {
			subject.next(0); // dummy value
			subject.complete();
		};
		el.onerror = (ev) => subject.error(ev);
		el.href = href;
		return [el, subject];

	}

	appendScriptToBody(src: string): Observable<number> {

		const existing = this.checkScriptElement(src);
		if (existing)
			return EMPTY;

		const [el, subject] = this.createScript(src);
		this.document.body.appendChild(el);
		return subject.asObservable();

	}

	private checkScriptElement(src: string): boolean {

		const body = this.document.body;
		return !!body.querySelector(`script[src="${src}"]`);

	}

	private createScript(src: string): [HTMLScriptElement, Subject<number>] {

		const subject = new Subject<number>();
		const el: HTMLScriptElement = this.document.createElement('script');
		el.type = 'text/javascript';
		el.src = src;
		el.async = true;
		el.defer = true;
		el.onload = () => {
			subject.next(0); // dummy value
			subject.complete();
		};
		el.onerror = (ev) => subject.error(ev);
		return [el, subject];

	}

}