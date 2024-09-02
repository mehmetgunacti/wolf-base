import { Note, TAG_PINNED, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selEntityList, selEntityMap, selSelectedEntity, selSelectedId } from './note-entity.selectors';

export const selNote_rootArray = createSelector(

	selEntityList,
	(arr): Note[] => arr.filter(n => n.parentId === null)

);

export const selNote_pinnedArray = createSelector(

	selEntityList,
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

	selEntityMap,
	selSelectedId,
	(entities, selectedId): Note[] => calcParents(entities, selectedId)

);

export const selNote_selectedEntityChildren = createSelector(

	selEntityList,
	selSelectedEntity,
	(all, selected): Note[] => selected ? all.filter(n => n.parentId === selected.id) : []

);
