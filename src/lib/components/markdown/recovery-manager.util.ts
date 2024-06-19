import { Injectable, InjectionToken, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toDateObject } from 'lib/utils';

interface LSTimestamp {

	index: number,
	timestamp: number

}

export interface LSEntry {

	time: Date;
	content: string;

}

export interface RecoveryManager {

	recoverableContent: Signal<LSEntry | null>;
	hasPrev: Signal<boolean>;
	hasNext: Signal<boolean>;

	init(): void;
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

	private timestamps: LSTimestamp[] = [];
	private nextIndex: number = -1;
	private thresholdCounter: number = 0;

	private readonly viewIndex: WritableSignal<number> = signal(0);
	public readonly recoverableContent: Signal<LSEntry | null> = computed(

		() => {

			const lsTimestamp = this.timestamps[this.viewIndex()];
			if (lsTimestamp)
				return this.readEntry(lsTimestamp.index);
			return null;

		}

	);
	public readonly hasPrev: Signal<boolean> = computed(() => !!this.timestamps[this.viewIndex() - 1]);
	public readonly hasNext: Signal<boolean> = computed(() => !!this.timestamps[this.viewIndex() + 1]);

	constructor() {

		this.init();

	}

	public init(): void {

		this.timestamps = this.readTimestamps(); // ordered by 'index' field, descending
		if (this.timestamps.length < 1) {// empty?

			this.nextIndex = LS_MIN_INDEX;
			return;

		}
		this.viewIndex.set(-1); // force re-calculate dependent signals
		this.viewIndex.set(0);
		this.nextIndex = this.peekNextIndex(this.timestamps[0].index);

	}

	public save(content: string): void {

		this.thresholdCounter++;
		if (this.thresholdCounter % LS_SAVE_THRESHOLD > 0)
			return;

		this.writeEntry(this.nextIndex, content);
		this.nextIndex = this.peekNextIndex(this.nextIndex);

	}

	public next(): void {

		this.viewIndex.update(idx => this.timestamps[idx + 1] ? idx + 1 : idx);

	}

	public previous(): void {

		this.viewIndex.update(idx => this.timestamps[idx - 1] ? idx - 1 : idx);

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

	private readTimestamps(): LSTimestamp[] {

		const arr: LSTimestamp[] = [];
		for (let index = LS_MIN_INDEX; index <= LS_MAX_INDEX; ++index) {

			const currentTS = this.readTimestamp(index);
			if (currentTS === null)
				break;
			arr.push({
				index,
				timestamp: currentTS.getTime()
			});

		}
		return arr.sort((a, b) => b.timestamp - a.timestamp);

	}

	private read(key: string): string | null {

		return localStorage.getItem(key);

	}

	private write(key: string, value: string): void {

		localStorage.setItem(key, value);

	}

}
