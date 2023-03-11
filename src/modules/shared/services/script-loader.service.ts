import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ScriptLoaderService {

	private scripts: Map<string, BehaviorSubject<boolean>> = new Map();
	private styles: Map<string, BehaviorSubject<boolean>> = new Map();

	constructor(
		@Inject(DOCUMENT) private readonly document: Document
	) {}

	loadScript(url: string): Observable<boolean> {

		const existing = this.scripts.get(url);
		if (existing)
			return existing.asObservable();

		const subject = new BehaviorSubject<boolean>(false);
		this.scripts.set(url, subject);

		// create script element
		const script = this.document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			subject.next(true);
			subject.complete();
		}

		// add script element to head (for 'body', add parameters to this method)
		this.document.head.appendChild(script);

		return subject.asObservable();

	}

	loadCSS(url: string): Observable<boolean> {

		const existing = this.styles.get(url);
		if (existing)
			return existing.asObservable();

		const subject = new BehaviorSubject<boolean>(false);
		this.styles.set(url, subject);

		// create link element
		const css: HTMLLinkElement = this.document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = url;
		css.onload = () => {
			subject.next(true);
			subject.complete();
		}

		// add style element to head
		this.document.head.appendChild(css);

		return subject.asObservable();

	}

}
