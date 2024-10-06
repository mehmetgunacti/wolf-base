import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
	selector: 'w-selected-tags',
	templateUrl: './selected-tags.component.html',
	styleUrls: ['./selected-tags.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTagsComponent {

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
