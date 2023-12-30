import { Note, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_EntitiesState } from './note.selectors';

export const selNote_entities = createSelector(

	selNote_EntitiesState,
	entities => entities.entities

);

export const selNote_ids = createSelector(

	selNote_EntitiesState,
	state => Object.keys(state.entities)

);

export const selNote_array = createSelector(

	selNote_EntitiesState,
	(state): Note[] => Object.values(state.entities)

);

export const selNote_rootArray = createSelector(

	selNote_array,
	(arr): Note[] => arr.filter(n => n.parentId === null)

);

export const selNotes_count = createSelector(

	selNote_ids,
	ids => ids.length

);

export const selNote_selected = createSelector(

	selNote_EntitiesState,
	state => state.selectedId ? state.entities[state.selectedId] : null

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

export const selNote_selectedEntityParents = createSelector(

	selNote_EntitiesState,
	(state): Note[] => calcParents(state.entities, state.selectedId)

);

export const selNote_selectedEntityChildren = createSelector(

	selNote_array,
	selNote_selected,
	(all, selected): Note[] => selected ? all.filter(n => n.parentId === selected.id) : []

);
