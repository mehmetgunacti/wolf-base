import { Injectable, InjectionToken, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toDateObject } from 'lib/utils';

export interface LSEntry {

	time: Date;
	content: string;

}

export interface RecoveryManager {

	recoverableContent: Signal<LSEntry | null>;
	hasPrev: Signal<boolean>;
	hasNext: Signal<boolean>;

	init(): boolean;
	save(content: string): void;
	next(): void;
	previous(): void;

}

/** index of first entry in LS */
const LS_MIN_INDEX = 1;

/** total number of entries to be hold in LS */
const LS_MAX_INDEX = 6;

/** save every n update to UndoCache */
const LS_SAVE_THRESHOLD = 2;

/** name of LS entry */
const LS_ENTRY_KEY = 'note_editor_';

export const RECOVERY_MANAGER = new InjectionToken<RecoveryManager>('RecoveryManager');

@Injectable()
export class RecoveryManagerImpl implements RecoveryManager {

	private nextIndex: number = -1;
	private thresholdCounter: number = 0;

	private readonly viewCounter: WritableSignal<number> = signal(-1); // -1 = uninitialized
	public readonly recoverableContent: Signal<LSEntry | null> = computed(

		() => this.readEntry(this.viewCounter())

	);
	public readonly hasPrev: Signal<boolean> = computed(() => this.readTimestamp(this.viewCounter() - 1) !== null);
	public readonly hasNext: Signal<boolean> = computed(() => this.readTimestamp(this.viewCounter() + 1) !== null);

	constructor() {

		this.init();

	}

	public init(): boolean {

		const mostRecentIndex = this.findIndexOfMostRecentEntry();
		if (mostRecentIndex === null) {

			this.nextIndex = LS_MIN_INDEX;
			return false;

		}
		this.viewCounter.set(mostRecentIndex);
		this.nextIndex = this.peekNextIndex(mostRecentIndex);
		return true;

	}

	public save(content: string): void {

		this.thresholdCounter++;
		if (this.thresholdCounter % LS_SAVE_THRESHOLD > 0)
			return;

		this.writeEntry(this.nextIndex, content);
		this.viewCounter.set(this.nextIndex);
		this.nextIndex = this.peekNextIndex(this.nextIndex);

	}

	public next(): void {

		this.viewCounter.update(idx => this.peekNextIndex(idx));

	}

	public previous(): void {

		this.viewCounter.update(idx => this.peekPrevIndex(idx));

	}

	private readEntry(idx: number): LSEntry | null {

		const time: Date | null = this.readTimestamp(idx);
		if (time === null)
			return null;

		const content: string | null = this.readContent(idx);
		if (content === null)
			return null;

		const entry: LSEntry = {

			time,
			content

		};
		return entry;

	}

	private readContent(idx: number): string | null {

		const key = this.getContentKey(idx);
		return this.read(key);

	}

	private readTimestamp(idx: number): Date | null {

		const key = this.getTimestampKey(idx);
		const value = this.read(key);
		if (value === null)
			return null;
		return toDateObject(value);

	}

	private writeEntry(idx: number, content: string): void {

		const timestampKey = this.getTimestampKey(idx);
		this.write(timestampKey, new Date().getTime().toString());

		const contentKey = this.getContentKey(idx);
		this.write(contentKey, content);

	}

	private getContentKey(idx: number): string {

		return LS_ENTRY_KEY + idx.toString().padStart(3, '0');

	}

	private getTimestampKey(idx: number): string {

		return this.getContentKey(idx) + '_ts';

	}

	private peekNextIndex(idx: number): number {

		return idx + 1 > LS_MAX_INDEX ? LS_MIN_INDEX : idx + 1;

	}

	private peekPrevIndex(idx: number): number {

		return idx - 1 < LS_MIN_INDEX ? LS_MAX_INDEX : idx - 1;

	}

	private findIndexOfMostRecentEntry(): number | null {

		const firstTS: Date | null = this.readTimestamp(LS_MIN_INDEX);
		// if there are no entries at all, return null
		if (firstTS === null)
			return null;

		// array of array; 1st element = idx, 2nd element = milliseconds
		const arr: number[][] = [[LS_MIN_INDEX, firstTS.getTime()]];
		for (let idx = LS_MIN_INDEX + 1; idx <= LS_MAX_INDEX; ++idx) {

			const currentTS = this.readTimestamp(idx);
			if (currentTS === null)
				break;
			arr.push([idx, currentTS.getTime()]);

		}
		return arr.sort((a, b) => b[1] - a[1])[0][0];

	}

	private read(key: string): string | null {

		return localStorage.getItem(key);

	}

	private write(key: string, value: string): void {

		localStorage.setItem(key, value);

	}

}
