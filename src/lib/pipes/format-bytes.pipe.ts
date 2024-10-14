import { Pipe, PipeTransform } from '@angular/core';
import { formatBytes } from '@utils';

@Pipe({
	name: 'formatBytes',
	standalone: true
})
export class FormatBytesPipe implements PipeTransform {

	transform(bytes: number | null | undefined): string {

		if (bytes)
			return formatBytes(bytes);
		return '';

	}

}
