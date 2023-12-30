import { Injectable } from '@angular/core';
import { parseURL } from '@lib';
import { Observable, catchError, from, map, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClipboardService {

	fromClipboard(): Observable<URL | null> {

		return from(navigator.clipboard.readText()).pipe(

			map(text => parseURL(text)),
			catchError(err => {

				// If there's an error reading the clipboard, return null
				console.error('Failed to read clipboard content: ', err);
				return of(null);

			})

		);

	}

}
