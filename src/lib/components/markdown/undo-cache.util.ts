import { Injectable, InjectionToken, Signal, WritableSignal, computed, signal } from '@angular/core';
import { formatBytes } from 'lib/utils';
import { EditorProperties } from './textarea-properties.model';

const EMPTY_PROPS: EditorProperties = {
	content: '',
	sIndex: 0,
	eIndex: 0
}

export const UNDO_CACHE = new InjectionToken<UndoCache>('UndoCache');

@Injectable()
export class UndoCache {

	// signals
	private stack: WritableSignal<EditorProperties[]> = signal([EMPTY_PROPS]);
	private idx: WritableSignal<number> = signal(0);

	// computed values
	canUndo: Signal<boolean> = computed(() => this.idx() > 0);
	canRedo: Signal<boolean> = computed(() => this.idx() < this.stack().length - 1);
	props: Signal<EditorProperties> = computed(() => this.stack()[this.idx()]);
	size: Signal<number> = computed(() => this.props()?.content.length ?? 0);
	memSize: Signal<string> = computed(() => `${formatBytes(this.stack().reduce((t, a) => t + a.content.length, 0))}`);
	discSize: Signal<string> = computed(() => `${formatBytes(this.size())}`);

	initialize(content: string): void {

		if (content)
			this.stack.set([{
				content: content,
				sIndex: content.length,
				eIndex: content.length
			}]);
		else
			console.warn(`'content' should not be undefined or null`);

	}

	saveState({ content, sIndex, eIndex }: EditorProperties): void {

		if (content === this.props().content)
			return;

		const arr = [...this.stack().slice(0, this.idx() + 1)]; // clears redo-cache (right-side of index)
		this.incIdx();
		arr[this.idx()] = { content, sIndex, eIndex };
		this.stack.set(arr);

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
