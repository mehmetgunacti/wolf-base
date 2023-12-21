import { Note, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteEntitiesState } from './note.selectors';

export const selNotes = createSelector(

	selNoteEntitiesState,
	entities => entities.entities

);

export const selNoteIds = createSelector(

	selNoteEntitiesState,
	state => Object.keys(state.entities)

);

export const selNoteArray = createSelector(

	selNoteEntitiesState,
	(state): Note[] => Object.values(state.entities)

);

export const selNoteRootArray = createSelector(

	selNoteArray,
	(arr): Note[] => arr.filter(n => n.parentId === null)

);

export const selNotesCount = createSelector(

	selNoteIds,
	ids => ids.length

);

export const selNoteEdited = createSelector(

	selNoteEntitiesState,
	state => state.editId ? state.entities[state.editId] : null

);

export const selNoteSelected = createSelector(

	selNoteEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);

function calcParents(entities: Record<UUID, Note>, selectedId: UUID | null): Note[] {

	if (!selectedId)
		return [];

	let parentId = entities[selectedId]?.parentId;
	if (!parentId)
		return [];

	const result: Note[] = [];
	while (!!parentId) {

		const parent: Note = entities[parentId];
		result.unshift(parent);
		parentId = parent.parentId;

	}
	return result;

}

export const selNoteSelectedEntityParents = createSelector(

	selNoteEntitiesState,
	(state): Note[] => calcParents(state.entities, state.selected)

);

export const selNoteSelectedEntityChildren = createSelector(

	selNoteArray,
	selNoteSelected,
	(all, selected): Note[] => selected ? all.filter(n => n.parentId === selected.id) : []

);
