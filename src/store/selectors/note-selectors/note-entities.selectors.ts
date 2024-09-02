import { Note, TAG_PINNED, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_EntitiesState } from '../entity-selectors/entity.selectors';
import { selNote_UIState } from './note.selectors';

export const selNote_entities = createSelector(

	selNote_EntitiesState,
	(entities): Record<UUID, Note> => entities.entities as Record<UUID, Note>

);

export const selNote_ids = createSelector(

	selNote_EntitiesState,
	state => Object.keys(state.entities)

);

export const selNote_array = createSelector(

	selNote_entities,
	(state): Note[] => Object.values(state)

);

export const selNote_rootArray = createSelector(

	selNote_array,
	(arr): Note[] => arr.filter(n => n.parentId === null)

);

export const selNote_pinnedArray = createSelector(

	selNote_array,
	(arr): Note[] => arr.filter(n => n.tags.includes(TAG_PINNED))

);

export const selNotes_count = createSelector(

	selNote_ids,
	ids => ids.length

);

export const selNote_selected = createSelector(

	selNote_entities,
	selNote_UIState,
	(entities, uiState) => uiState.selectedId ? entities[uiState.selectedId] : null

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

	selNote_entities,
	selNote_UIState,
	(entities, uiState): Note[] => calcParents(entities, uiState.selectedId)

);

export const selNote_selectedEntityChildren = createSelector(

	selNote_array,
	selNote_selected,
	(all, selected): Note[] => selected ? all.filter(n => n.parentId === selected.id) : []

);
