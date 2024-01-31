import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes } from 'lib/utils';
import { EditorProperties } from './textarea-properties.model';

const EMPTY_PROPS: EditorProperties = {
	content: '',
	sIndex: 0,
	eIndex: 0
}

const LS_MAX_SAVE_COUNT = 500; // 500 / 10 = 50 ls entries
const LS_SAVE_THRESHOLD = 10;
const LS_PREFIX = 'note_content_editor_';

export class UndoCache {

	// signals
	private stack: WritableSignal<EditorProperties[]> = signal([EMPTY_PROPS]);
	private idx: WritableSignal<number> = signal(0);

	// save to local-storage
	private counter: WritableSignal<number> = signal(0);

	// computed values
	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	props: Signal<EditorProperties> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.props().content.length);
	memSize: Signal<string> = computed(() => `${formatBytes(this.stack().reduce((t, a) => t + a.content.length, 0))}`);
	discSize: Signal<string> = computed(() => `${formatBytes(this.size())}`);

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

		this.counter.update(c => c + 1);
		if (this.counter() % LS_SAVE_THRESHOLD === 0)
			localStorage.setItem(`${LS_PREFIX}${this.counter()}_${new Date().toISOString()}`, content);

		// LS_MAX_SAVE_COUNT localStorage entries
		if (this.counter() > LS_MAX_SAVE_COUNT)
			this.counter.set(0);

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
