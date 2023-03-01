import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScriptLoaderService {

	private scripts: Map<string, HTMLScriptElement> = new Map();

	loadScript(url: string) {

		if (this.scripts.has(url))
			return;

		// create script element
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.async = true;
		script.defer = true;

		// add script element to head
		document.head.appendChild(script);

		// store script element in script map
		this.scripts.set(url, script);

	}

	removeScript(url: string) {

		const script = this.scripts.get(url);
		if (script) {

			// remove script element from head
			document.head.removeChild(script);

			// remove script element from script map
			this.scripts.delete(url);

		}

	}

}
