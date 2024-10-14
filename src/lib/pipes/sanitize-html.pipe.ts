import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {

	constructor(private _sanitizer: DomSanitizer) { }

	transform(content: string | null): SafeHtml | string {

		if (!content)
			return '';
		return this._sanitizer.bypassSecurityTrustHtml(content);

	}

}


@NgModule({

	declarations: [SanitizeHtmlPipe],
	imports: [CommonModule],
	exports: [SanitizeHtmlPipe]

})
export class SanitizeHtmlModule { }
