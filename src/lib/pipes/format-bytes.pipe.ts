import { Pipe, PipeTransform } from '@angular/core';
import { formatBytes } from 'lib/utils';

@Pipe({ name: 'formatBytes' })
export class FormatBytesPipe implements PipeTransform {

	transform(bytes: number | null | undefined): string {

		if (bytes)
			return formatBytes(bytes);
		return '';

	}

}
