import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TAG_PINNED, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { InputComponent, InputTagComponent, SelectTreeComponent } from '@libComponents';
import { Note } from '@models';
import { Subject } from 'rxjs';
import { NOTE_FORM, NoteFormImpl } from './note-form';

@Component({
	standalone: true,
	imports: [ InputComponent, InputTagComponent, SelectTreeComponent, ReactiveFormsModule, GlyphDirective, AsyncPipe ],
	selector: 'app-note-form',
	templateUrl: './note-form.component.html',
	providers: [ { provide: NOTE_FORM, useClass: NoteFormImpl } ],
	host: {
		'class': 'component'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent {

	TAG_PINNED = TAG_PINNED;

	// Input
	note = input<Note | null>(null);
	parentId = input<UUID | null>(null);
	nodes = input<Note[]>([]);
	tagSuggestions = input<string[]>([]);

	// Output
	create = output<Partial<Note>>();
	update = output<{ id: UUID, note: Partial<Note>; }>();
	tagInput = output<string | null>();

	protected form = inject(NOTE_FORM);
	protected tagSuggestions$ = new Subject<string[]>();

	constructor() {

		effect(() => {

			const note = this.note();
			if (note)
				untracked(() => this.form.populate(note));

		});

		effect(() => {

			const parentId = this.parentId();
			if (parentId)
				untracked(() => this.form.parentId.setValue(parentId));

		});

		effect(() => {

			this.tagSuggestions$.next(this.tagSuggestions());

		});

	}

	onCopyTags(): void {

		const parentTags: string[] = this.nodes().find(n => n.id === this.form.parentId.value)?.tags ?? [];
		const currentTags: string[] = this.form.tags.value;
		this.form.tags.setValue([ ...currentTags, ...parentTags ]);

	}

	onSave(): void {

		if (this.form.fg.invalid)
			return;

		const note: Partial<Note> = { ...this.form.fg.value, modified: new Date().toISOString() } as Partial<Note>;
		if (note.id)
			this.update.emit({ id: note.id, note });
		else
			this.create.emit(note);

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

	onTogglePinned(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_PINNED) ? tags.filter(tag => tag !== TAG_PINNED) : [ TAG_PINNED, ...tags ]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

}
