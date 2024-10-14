import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UUID } from '@constants';
import { NoteContent, NoteQueryParams } from '@models';

export const noteActions = createActionGroup({

	source: 'Note',
	events: {

		// UI
		setSelectedId					: props<{ id: UUID | null }>(),
		setEditId						: props<{ id: UUID | null }>(),
		setQueryParams					: props<NoteQueryParams>(),

		// TAGS
		clickTag						: props<{ name: string }>(),
		setSelectedTags					: props<{ tags: string[] }>(),
		emptySelectedTags				: emptyProps(),
		search							: props<{ term: string }>(),

		// CONTENT
		loadOneContentSuccess			: props<{ content: NoteContent | null }>()

	}

});
