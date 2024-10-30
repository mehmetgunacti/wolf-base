import { Component, input, output } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-selected-tags',
	standalone: true,
	templateUrl: './selected-tags.component.html',
	styleUrls: [ './selected-tags.component.scss' ]
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
