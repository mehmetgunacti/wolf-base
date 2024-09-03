import { Note, TAG_PINNED, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_EntityList, selNote_EntityMap } from '../entity/entity-note.selectors';
import { selNote_UIState } from './note.selectors';

// SELECTED ID
export const selNote_SelectedId = createSelector(

	selNote_UIState,
	state => state.selectedId

);

export const selNote_SelectedEntity = createSelector(

	selNote_EntityMap,
	selNote_SelectedId,
	(map, id) => id ? map[id] : null

);

export const selNote_rootArray = createSelector(

	selNote_EntityList,
	(arr): Note[] => arr.filter(n => n.parentId === null)

);

export const selNote_pinnedArray = createSelector(

	selNote_EntityList,
	(arr): Note[] => arr.filter(n => n.tags.includes(TAG_PINNED))

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

	selNote_EntityMap,
	selNote_SelectedId,
	(entities, selectedId): Note[] => calcParents(entities, selectedId)

);

export const selNote_selectedEntityChildren = createSelector(

	selNote_EntityList,
	selNote_SelectedEntity,
	(all, selected): Note[] => selected ? all.filter(n => n.parentId === selected.id) : []

);
