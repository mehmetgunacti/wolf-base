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

	async base64ImageFromClipboard(): Promise<string | null> {

		try {

			const items: ClipboardItems = await navigator.clipboard.read();
			if (!items)
				return null; // Handle case where clipboard data is unavailable

			const imageItem = items.find((item) => item.types.find(t => t.startsWith('image/')));
			if (!imageItem)
				return null; // Handle case where no image is found in clipboard

			const blob = await imageItem.getType('image/png') || await imageItem.getType('image/jpeg');
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});

		} catch (error) {
			console.error(error);
			return null;
		}

	}

}
