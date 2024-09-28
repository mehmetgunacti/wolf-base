import { NoteContent, NoteQueryParams, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const noteActions = createActionGroup({

	source: 'Note',
	events: {

		// UI
		'Set Selected Id'					: props<{ id: UUID | null }>(),
		'Set Edit Id'						: props<{ id: UUID | null }>(),
		'Set Query Params'					: props<NoteQueryParams>(),

		// TAGS
		'Click Tag'							: props<{ name: string }>(),
		'Set Selected Tags'					: props<{ tags: string[] }>(),
		'Empty Selected Tags'				: emptyProps(),
		'Search'							: props<{ term: string }>(),

		// CONTENT
		'Load One Content Success'			: props<{ content: NoteContent | null }>()

	}

});
