import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'lib';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface TagUI {

	tag: Tag;
	fontSize: string;
	idx: number;

}

@Component({
	selector: 'app-tag-cloud',
	templateUrl: './tag-cloud.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagCloudComponent implements OnInit, OnChanges, OnDestroy {

	@Input() tags: Tag[] | undefined | null;
	@Input() selectedTags: string[] | undefined | null;

	@Output() tagClick: EventEmitter<string> = new EventEmitter();
	@Output() search: EventEmitter<string> = new EventEmitter();
	@Output() resetClick: EventEmitter<string> = new EventEmitter();

	uiTags!: TagUI[];
	searchControl!: FormControl;
	subscription!: Subscription;

	ngOnInit(): void {

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.search.emit(term));

	}

	ngOnChanges(changes: SimpleChanges): void {
		
		// add fontSize to tags array
		this.uiTags = this.createUITags();

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onTagClick(id: string): void {
		this.tagClick.emit(id);
	}

	onReset(): void {
		this.resetClick.emit();
	}

	// calculated font size based on the count property of each tag.
	private createUITags(): TagUI[] {
		console.log(this.selectedTags);

		// Initialize an empty array to hold the ITagUI objects.
		const uiArr: TagUI[] = [];

		// If the tags array exists.
		if (this.tags) {

			// Create an array of the count property of each tag.
			const arr: number[] = this.tags.map((t) => t.count);

			// Initialize a map to hold the font size for each count value.
			const fontSizeMap: Map<number, string> = new Map();

			// Define an array of font sizes to use.
			const fontSizeValues = ['0.8em', '1.3em', '1.5em', '1.7em', '1.9em'];

			// Remove duplicate values and sort the array of counts in ascending order.
			const uniqueArr = Array.from(new Set(arr));
			const sortedArr = uniqueArr.sort((a, b) => a - b);

			// Divide the array of counts into 5 buckets of roughly equal size.
			const bucketSize = Math.ceil(sortedArr.length / 5);

			// For each count value, determine which bucket it falls into and assign the appropriate font size.
			for (let i = 0; i < sortedArr.length; i++) {
				const fontSizeIndex = Math.floor(i / bucketSize);
				const count = sortedArr[i];
				const fontSize = fontSizeMap.get(count) || fontSizeValues[fontSizeIndex];
				fontSizeMap.set(count, fontSize);
			}

			// For each tag, create a new TagUI object with the font size based on the count value, and add it to the uiArr array.
			uiArr.push(
				...this.tags.map(
					(tag) => ({
						tag,
						fontSize: fontSizeMap.get(tag.count) || '1em',
						idx: this.selectedTags?.indexOf(tag.name) ?? -1
					})
				)
			);
			uiArr.sort((a, b) => a.tag.name < b.tag.name ? -1 : 1);

		}
		return uiArr;

	}

}
