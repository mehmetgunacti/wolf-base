import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'w-selected-tags',
	templateUrl: './selected-tags.component.html',
	styleUrls: ['./selected-tags.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTagsComponent {

	@Input() tags: string[] | undefined | null;
	@Input() selectedTags: string[] | undefined | null;

	@Output() tagClick: EventEmitter<string> = new EventEmitter();
	@Output() filterClick: EventEmitter<void> = new EventEmitter();

	onTagClick(name: string): void {

		this.tagClick.emit(name);

	}

	emptyFilter(): void {

		this.filterClick.emit();

	}

}
