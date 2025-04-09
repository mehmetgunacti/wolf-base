import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Tag } from '@models/tag.model';
import { BaseComponent } from '../base.component';

interface TagUI {

	tag: Tag;
	fontSize: string;
	// selectedIdx: number;
	// disabled: boolean;
	className: string;

}

// return css class name
function setClassName(selectedTags: string[], relatedTags: string[], name: string): string {

	if (selectedTags.length === 0)
		return ''; // do not override css 'color'

	const selected = selectedTags.includes(name);
	if (selected)
		return 'selected';

	if (relatedTags.includes(name))
		return 'related';

	return 'disabled';

}

// add fontSize to tags array
// calculated font size based on the count property of each tag.
function createUITags(selectedTags: string[], relatedTags: string[], tags: Tag[]): TagUI[] {

	// Initialize an empty array to hold the ITagUI objects.
	const uiArr: TagUI[] = [];

	// Create an array of the count property of each tag.
	const arr: number[] = tags.map((t) => t.count);

	// Initialize a map to hold the font size for each count value.
	const fontSizeMap: Map<number, string> = new Map();

	// Define an array of font sizes to use.
	// const fontSizeValues = [ '0.8em', '1.4em', '1.7em', '2em', '2.3em' ];
	const fontSizeValues = [ 'text-sm', 'text-base', 'text-2xl', 'text-3xl', 'text-4xl' ];

	// Remove duplicate values and sort the array of counts in ascending order.
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort((a, b) => a - b);

	// Divide the array of counts into 5 buckets of roughly equal size.
	const bucketSize = Math.ceil(sortedArr.length / 5);

	// For each count value, determine which bucket it falls into and assign the appropriate font size.
	for (let i = 0; i < sortedArr.length; i++) {

		const fontSizeIndex = Math.floor(i / bucketSize);
		const count = sortedArr[ i ];
		const fontSize = fontSizeMap.get(count) || fontSizeValues[ fontSizeIndex ];
		fontSizeMap.set(count, fontSize);

	}

	// For each tag, create a new TagUI object with the font size based on the count value, and add it to the uiArr array.
	uiArr.push(
		...tags.map(
			(tag): TagUI => ({
				tag,
				fontSize: fontSizeMap.get(tag.count) || '1em',
				// selectedIdx: this.selectedTags?.indexOf(tag.name) ?? -1,
				// disabled: false,
				className: setClassName(selectedTags, relatedTags, tag.name)
			})
		)
	);
	uiArr.sort((a, b) => a.tag.name < b.tag.name ? -1 : 1);

	return uiArr;

}

@Component({
	imports: [ CommonModule ],
	selector: 'w-tag-cloud',
	templateUrl: './tag-cloud.component.html',
	styles: `
		/*// a,
		// span {

			// font-size 		: 1.1rem;
			// line-height		: 0.8;

// 			.selected {
//
// 				cursor		: pointer;
// 				color 		: var(--color-accent);
//
// 			}

// 			.related {
//
// 				cursor		: pointer;
// 				color 		: var(--color-text);
//
// 			}

// 			.disabled {
//
// 				color 		: var(--color-disabled);
// 				cursor		: text;
//
// 			}

		// }*/
	`,
	host: { 'class': 'flex flex-wrap items-center justify-center gap-1 p-4' }
})
export class TagCloudComponent extends BaseComponent {

	tags = input.required<Tag[]>();
	selectedTags = input.required<string[]>();
	relatedTags = input.required<string[]>();

	tagClick = output<string>();

	uiTags = computed(() => createUITags(this.selectedTags(), this.relatedTags(), this.tags()));

	onTagClick(id: string): void {

		//if (this.relatedTags?.includes(id))
		this.tagClick.emit(id);

	}

}
