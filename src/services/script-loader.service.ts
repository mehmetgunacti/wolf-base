import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface DOMObjectHolder {
	el: HTMLLinkElement | HTMLScriptElement;
	subject: Subject<void>;
}

@Injectable({
	providedIn: 'root'
})
export class ScriptLoaderService {

	private scripts: Map<string, DOMObjectHolder> = new Map();
	private styles: Map<string, DOMObjectHolder> = new Map();
	private readonly document: Document = inject(DOCUMENT);

	constructor() { }

	appendScript2Body(url: string): Observable<void> {

		const existing = this.scripts.get(url);
		if (existing)
			return existing.subject.asObservable();

		const subject = new Subject<void>();

		// create script element
		const el: HTMLScriptElement = this.document.createElement('script');
		el.type = 'text/javascript';
		el.src = url;
		el.async = true;
		el.defer = true;
		el.onload = () => subject.complete();
		el.onerror = (ev) => subject.error(ev);

		// add script element to head (for 'body', add parameters to this method)
		this.document.body.appendChild(el);

		this.scripts.set(url, { el, subject });
		return subject.asObservable();

	}

	removeScriptFromBody(url: string): void {

		const existing = this.scripts.get(url);
		if (existing)
			document.body.removeChild(existing.el);

	}

	appendLink2Head(url: string): Observable<void> {

		const existing = this.styles.get(url);
		if (existing) {

			this.document.head.appendChild(existing.el);
			return existing.subject.asObservable();

		}

		const subject = new Subject<void>();
		const el: HTMLLinkElement = this.document.createElement('link');
		el.rel = 'stylesheet';
		el.type = 'text/css';
		el.href = url;
		el.onload = () => subject.complete();
		el.onerror = (event) => subject.error(event);
		this.document.head.appendChild(el);

		this.styles.set(url, { el, subject });
		return subject.asObservable();

	}

	removeLinkFromHead(url: string): void {

		const existing = this.styles.get(url);
		if (existing)
			document.head.removeChild(existing.el);

	}

	addClassToBody(name: string): void {

		document.body.classList.add(name);

	}

	removeClassFromBody(name: string): void {

		document.body.classList.remove(name);

	}

}
