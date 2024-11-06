import { Component, input, output } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'w-selected-tags',
	templateUrl: './selected-tags.component.html',
	host: { 'class': 'flex flex-wrap items-center gap-1' }
})
export class SelectedTagsComponent extends BaseComponent {

	tags = input.required<string[]>();
	selectedTags = input.required<string[]>();

	tagClick = output<string>();
	filterClick = output<void>();

	onTagClick(name: string): void {

		this.tagClick.emit(name);

	}

	emptyFilter(): void {

		this.filterClick.emit();

	}

}
