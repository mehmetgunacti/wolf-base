import { Component, input, output } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
	standalone: true,
	selector: 'w-selected-tags',
	templateUrl: './selected-tags.component.html'
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
