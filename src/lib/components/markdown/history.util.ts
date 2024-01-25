import { Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes } from 'lib/utils';

export class UndoCache {

	stack: WritableSignal<string[]> = signal(['']);
	idx: WritableSignal<number> = signal(0);

	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	content: Signal<string> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.content().length);
	sizeFormatted = computed(() => `${formatBytes(this.size())} / ${formatBytes(this.stack().reduce((t, a) => t + a.length, 0))} (${this.stack().length})`);

	saveState(content: string = '', replaceCurrent: boolean = false): void {

		if (content === this.content())
			return;

		const arr = [...this.stack().slice(0, this.idx() + 1)]; // clears redo-cache (right-side of index)
		if (!replaceCurrent) // mainly for replacing initial empty string (after content is loaded from IndexedDb)
			this.incIdx();
		arr[this.idx()] = content;
		this.stack.set(arr);
		// console.log(this.idx(), this.stack());

	}

	undo(): void {

		if (this.canUndo())
			this.decIdx();
		// console.log(this.idx(), this.stack());


	}

	redo(): void {

		if (this.canRedo())
			this.incIdx();
		// console.log(this.idx(), this.stack());

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
