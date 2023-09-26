import { Injectable, inject } from '@angular/core';
import { THEME_DARK, THEME_LIGHT } from '@lib';
import { DOMService } from './dom.service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	private domService: DOMService = inject(DOMService);

	switchTheme(dark: boolean): Observable<number> {

		// if (dark) {
		// 	this.domService.removeLinkFromHead(THEME_LIGHT);
		// 	return this.domService.appendLinkToHead(THEME_DARK);
		// } else {
		// 	this.domService.removeLinkFromHead(THEME_DARK);
		// 	return this.domService.appendLinkToHead(THEME_LIGHT);
		// }
		return of(1);

	}

}
