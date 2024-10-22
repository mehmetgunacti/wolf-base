import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
	name: 'sanitizeHtml',
	standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {

	constructor(private _sanitizer: DomSanitizer) { }

	transform(content: string | null): SafeHtml | string {

		if (!content)
			return '';
		return this._sanitizer.bypassSecurityTrustHtml(content);

	}

}
