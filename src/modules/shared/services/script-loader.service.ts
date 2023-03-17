import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScriptLoaderService {

	private scripts: Map<string, Subject<void>> = new Map();
	private styles: Map<string, Subject<void>> = new Map();

	constructor(
		@Inject(DOCUMENT) private readonly document: Document
	) {}

	loadScript(url: string): Observable<void> {

		const existing = this.scripts.get(url);
		if (existing)
			return existing.asObservable();

		const subject = new Subject<void>();
		this.scripts.set(url, subject);

		// create script element
		const script = this.document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		script.defer = true;
		script.onload = () => subject.complete();
		script.onerror = (ev) => subject.error(ev);

		// add script element to head (for 'body', add parameters to this method)
		this.document.body.appendChild(script);

		return subject.asObservable();

	}

	loadCSS(url: string): Observable<void> {

		const existing = this.styles.get(url);
		if (existing)
			return existing.asObservable();

		const subject = new Subject<void>();
		this.styles.set(url, subject);

		// create link element
		const css: HTMLLinkElement = this.document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = url;
		css.onload = () => subject.complete();
		css.onerror = (ev) => subject.error(ev);

		// add style element to head
		this.document.head.appendChild(css);

		return subject.asObservable();

	}

}
