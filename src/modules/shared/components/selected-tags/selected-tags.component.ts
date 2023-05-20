import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-selected-tags',
	templateUrl: './selected-tags.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTagsComponent implements OnChanges {

	@Input() tags: string[] | undefined | null;
	@Input() selectedTags: string[] | undefined | null;

	@Output() tagClick: EventEmitter<string> = new EventEmitter();
	@Output() filterClick: EventEmitter<void> = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void { }

	onTagClick(name: string): void {

		this.tagClick.emit(name);

	}

	emptyFilter(): void {

		this.filterClick.emit();

	}

	// @Input() selectedTags: string[] | undefined | null;
	// @Input() relatedTags: string[] | undefined | null;


	// @Output() resetClick: EventEmitter<string> = new EventEmitter();

	// uiTags!: TagUI[];

	// ngOnChanges(changes: SimpleChanges): void {

	// 	// add fontSize to tags array
	// 	this.uiTags = this.createUITags();

	// }



	// onReset(): void {

	// 	this.resetClick.emit();

	// }

	// // calculated font size based on the count property of each tag.
	// private createUITags(): TagUI[] {

	// 	// Initialize an empty array to hold the ITagUI objects.
	// 	const uiArr: TagUI[] = [];

	// 	// If the tags array exists.
	// 	if (this.tags) {

	// 		// Create an array of the count property of each tag.
	// 		const arr: number[] = this.tags.map((t) => t.count);

	// 		// Initialize a map to hold the font size for each count value.
	// 		const fontSizeMap: Map<number, string> = new Map();

	// 		// Define an array of font sizes to use.
	// 		const fontSizeValues = ['0.8em', '1.4em', '1.7em', '2em', '2.3em'];

	// 		// Remove duplicate values and sort the array of counts in ascending order.
	// 		const uniqueArr = Array.from(new Set(arr));
	// 		const sortedArr = uniqueArr.sort((a, b) => a - b);

	// 		// Divide the array of counts into 5 buckets of roughly equal size.
	// 		const bucketSize = Math.ceil(sortedArr.length / 5);

	// 		// For each count value, determine which bucket it falls into and assign the appropriate font size.
	// 		for (let i = 0; i < sortedArr.length; i++) {
	// 			const fontSizeIndex = Math.floor(i / bucketSize);
	// 			const count = sortedArr[i];
	// 			const fontSize = fontSizeMap.get(count) || fontSizeValues[fontSizeIndex];
	// 			fontSizeMap.set(count, fontSize);
	// 		}

	// 		// For each tag, create a new TagUI object with the font size based on the count value, and add it to the uiArr array.
	// 		uiArr.push(
	// 			...this.tags.map(
	// 				(tag) => ({
	// 					tag,
	// 					fontSize: fontSizeMap.get(tag.count) || '1em',
	// 					selectedIdx: this.selectedTags?.indexOf(tag.name) ?? -1,
	// 					disabled: false,
	// 					className: this.setClassName(tag.name)
	// 				})
	// 			)
	// 		);
	// 		uiArr.sort((a, b) => a.tag.name < b.tag.name ? -1 : 1);

	// 	}
	// 	return uiArr;

	// }

	// private setClassName(name: string): string {

	// 	const selectedTags = this.selectedTags ?? [];
	// 	if (selectedTags.length === 0)
	// 		return ''; // do not override css 'color'

	// 	const selected = selectedTags.includes(name);
	// 	if (selected)
	// 		return 'selected';

	// 	const relatedTags = this.relatedTags ?? [];
	// 	if (relatedTags.includes(name))
	// 		return 'related';

	// 	return 'disabled';

	// }

}
