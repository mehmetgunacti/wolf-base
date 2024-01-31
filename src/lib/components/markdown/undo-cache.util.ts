import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes, sleep } from 'lib/utils';
import { EditorProperties } from './textarea-properties.model';

const EMPTY_PROPS: EditorProperties = {
	content: '',
	sIndex: 0,
	eIndex: 0
}

interface LSEntries {

	entries: LSEntry[];

}

interface LSEntry {

	time: string;
	content: string;

}

class LSManager {

	/** total number of entries to be hold in LS */
	private static LS_MAX_SAVE_COUNT = 20;

	/** save every n update to UndoCache */
	private static LS_SAVE_THRESHOLD = 5;

	/** name of LS entry */
	private static LS_ENTRIES = 'note_content_editor';

	private counter: number = 0;

	public save(content: string): void {

		this.counter++;
		if (this.counter % LSManager.LS_SAVE_THRESHOLD > 0)
			return;

		const entries: LSEntries = this.readEntries();
		entries.entries.push({
			time: new Date().toISOString(),
			content
		});
		if (entries.entries.length > LSManager.LS_MAX_SAVE_COUNT)
			entries.entries.splice(0, 1);
		localStorage.setItem(LSManager.LS_ENTRIES, JSON.stringify(entries));

	}

	private readEntries(): LSEntries {

		const s = localStorage.getItem(LSManager.LS_ENTRIES);
		if (s)
			return JSON.parse(s) as LSEntries;
		return { entries: [] };

	}

}

export class UndoCache {

	// signals
	private stack: WritableSignal<EditorProperties[]> = signal([EMPTY_PROPS]);
	private idx: WritableSignal<number> = signal(0);

	// computed values
	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	props: Signal<EditorProperties> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.props().content.length);
	memSize: Signal<string> = computed(() => `${formatBytes(this.stack().reduce((t, a) => t + a.content.length, 0))}`);
	discSize: Signal<string> = computed(() => `${formatBytes(this.size())}`);

	private lsManager: LSManager = new LSManager();

	initialize(content: string): void {

		this.stack.set([{
			content: content,
			sIndex: content.length,
			eIndex: content.length
		}]);

	}

	saveState({ content, sIndex, eIndex }: EditorProperties): void {

		if (content === this.props().content)
			return;

		const arr = [...this.stack().slice(0, this.idx() + 1)]; // clears redo-cache (right-side of index)
		this.incIdx();
		arr[this.idx()] = { content, sIndex, eIndex };
		this.stack.set(arr);

		// save to localStorage
		this.lsManager.save(content);

	}

	undo(): void {

		if (this.canUndo())
			this.decIdx();

	}

	redo(): void {

		if (this.canRedo())
			this.incIdx();

	}

	private incIdx(): void {

		if (this.idx() < this.stack().length)
			this.idx.update(idx => ++idx);

	}

	private decIdx(): void {

		if (this.idx() > 0)
			this.idx.update(idx => --idx);

	}

}
