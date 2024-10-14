import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hideEnum' })
export class HideEnumPipe implements PipeTransform {

	constructor() { }

	transform(content: string | null): string {

		if (!content)
			return '';

		// any number followed by " - "
		// 01 - First title -> First title
		// 02 - Second title -> Second title
		// ...
		const regex = /^\d+\s-\s/;
		if (regex.test(content))
			return content.replace(regex, '');
		return content;

	}

}


@NgModule({

	declarations: [HideEnumPipe],
	imports: [],
	exports: [HideEnumPipe]

})
export class HideEnumModule { }
