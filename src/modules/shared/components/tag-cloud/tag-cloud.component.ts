import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Tag } from 'lib';

interface ITagUI extends Tag {
	className: string;
}

@Component({
	selector: 'app-tag-cloud',
	templateUrl: './tag-cloud.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagCloudComponent implements OnInit, OnDestroy {

	@Input() tags: Tag[] = [];
	@Input() selectedTags: { [key: string]: boolean } = {};

	@Output() tagClick: EventEmitter<string> = new EventEmitter();
	@Output() search: EventEmitter<string> = new EventEmitter();
	@Output() resetClick: EventEmitter<string> = new EventEmitter();

	uiTags!: ITagUI[];
	searchControl!: FormControl;
	subscription!: Subscription;

	ngOnInit(): void {

		this.searchControl = new FormControl();
		this.subscription = this.searchControl.valueChanges.pipe(
			debounceTime(400),
			distinctUntilChanged()
		).subscribe(term => this.search.emit(term));

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

	createUITags(): ITagUI[] {

		const map: Map<number, string> = this.createLookupMap(this.tags.map(t => t.count));
		const uiArr: ITagUI[] = [];
		this.tags.forEach(tag => uiArr.push({ ...tag, className: 'big_' + map.get(tag.count) }));

		return uiArr;

	}

	createLookupMap(arrTagCounts: number[]): Map<number, string> {

		const BUCKETS = 5; // 5 CSS classes

		// turn set into array
		const arrUniqueAndSortedTagCounts: number[] =
			Array
				.from(new Set<number>(arrTagCounts))
				.sort((a, b) => a < b ? -1 : 1);

		// calculate divider and rest
		const div = Math.floor(arrUniqueAndSortedTagCounts.length / BUCKETS);
		let rest = arrUniqueAndSortedTagCounts.length % BUCKETS;

		// initialize final map
		const mapOutput = new Map<number, string>(); // : { [key: number]: string } = {};

		// iterate whole array and put every item into the map with bucket name as value
		// [270, 122, 270, 271, 272, 273, 270, 27, 98, 17, 2, 14, 3, 18, 19, 22, 121, 33, 24, 1, 4, 2, 1, 5, 7];
		// this array will produce a map like this (= outcome) :
		// "1": "1",
		// "2": "1",
		// "3": "1",
		// "4": "1",
		// "5": "1",
		// "7": "2",
		// "14": "2",
		// "17": "2",
		// "18": "2",
		// "19": "3",
		// "22": "3",
		// "24": "3",
		// "27": "3",
		// "33": "4",
		// "98": "4",
		// "121": "4",
		// "122": "4",
		// "270": "5",
		// "271": "5",
		// "272": "5",
		// "273": "5"

		let idxStart = 0;
		let idxEnd = idxStart + div + (rest > 0 ? 1 : 0);
		for (let i = idxStart; i < idxEnd; ++i)
			mapOutput.set(arrUniqueAndSortedTagCounts[i], '1');

		idxStart = idxEnd;
		--rest;
		idxEnd = idxStart + div + (rest > 0 ? 1 : 0);
		for (let i = idxStart; i < idxEnd; ++i)
			mapOutput.set(arrUniqueAndSortedTagCounts[i], '2');

		idxStart = idxEnd;
		--rest;
		idxEnd = idxStart + div + (rest > 0 ? 1 : 0);
		for (let i = idxStart; i < idxEnd; ++i)
			mapOutput.set(arrUniqueAndSortedTagCounts[i], '3');

		idxStart = idxEnd;
		--rest;
		idxEnd = idxStart + div + (rest > 0 ? 1 : 0);
		for (let i = idxStart; i < idxEnd; ++i)
			mapOutput.set(arrUniqueAndSortedTagCounts[i], '4');

		idxStart = idxEnd;
		--rest;
		idxEnd = idxStart + div + (rest > 0 ? 1 : 0);
		for (let i = idxStart; i < idxEnd; ++i)
			mapOutput.set(arrUniqueAndSortedTagCounts[i], '5');

		return mapOutput;

	}

}
