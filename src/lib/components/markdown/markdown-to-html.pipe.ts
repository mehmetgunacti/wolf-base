import { Pipe, PipeTransform, inject } from '@angular/core';
import { MarkdownService } from './markdown.service';

@Pipe({ name: 'markdownToHtml' })
export class MarkdownToHtmlPipe implements PipeTransform {

	private markdownService: MarkdownService = inject(MarkdownService);

	transform(content: string | null): string | null {

		if (!content)
			return null;
		return this.markdownService.render(content);

	}

}
