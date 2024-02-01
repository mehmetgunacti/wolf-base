import { Injectable, InjectionToken, Signal, WritableSignal, computed, signal } from '@angular/core';

export interface LSEntries {

	entries: LSEntry[];

}

export interface LSEntry {

	time: string;
	content: string;

}

/** total number of entries to be hold in LS */
const LS_MAX_SAVE_COUNT = 20;

/** save every n update to UndoCache */
const LS_SAVE_THRESHOLD = 5;

/** name of LS entry */
const LS_ENTRIES = 'note_content_editor';

export const LOCAL_STORAGE_MANAGER = new InjectionToken<LocalStorageManager>('LocalStorageManager');

@Injectable()
export class LocalStorageManager {

	private counter: number = 0;
	private entries: LSEntries | null = null;

	private viewCounter: WritableSignal<number> = signal(0);
	recoverableContent: Signal<LSEntry | null> = computed(
		() => this.entries?.entries[this.viewCounter()] ?? null
	);
	hasPrev: Signal<boolean> = computed(() => !!this.entries?.entries[this.viewCounter() - 1]);
	hasNext: Signal<boolean> = computed(() => !!this.entries?.entries[this.viewCounter() + 1]);

	save(content: string): void {

		this.counter++;
		if (this.counter % LS_SAVE_THRESHOLD > 0)
			return;

		let entries = this.readEntries();
		if (!entries)
			entries = { entries: [] };
		entries.entries.unshift({
			time: new Date().toISOString(),
			content
		});
		if (entries.entries.length > LS_MAX_SAVE_COUNT)
			entries.entries.splice(0, 1);
		localStorage.setItem(LS_ENTRIES, JSON.stringify(entries));

	}

	open(): boolean {

		this.entries = this.readEntries();
		this.viewCounter.set(0);
		return this.entries !== null;

	}

	next(): void {

		const curLength = this.entries?.entries.length ?? 0;
		this.viewCounter.update(c => c > curLength ? 0 : c + 1);

	}

	prev(): void {

		const curLength = this.entries?.entries.length ?? 0;
		this.viewCounter.update(c => c < 0 ? curLength : c - 1);

	}

	private readEntries(): LSEntries | null {

		const s = localStorage.getItem(LS_ENTRIES);
		if (s)
			return JSON.parse(s) as LSEntries;
		return null;

	}

}
