import { createSelector } from '@ngrx/store';
import { KBEntry, UUID } from 'lib';
import { TreeNode } from 'primeng/api';
import { selKnowledgeBaseEntitiesState } from './knowledge-base.selectors';

export const selKBEntriesDictionary = createSelector(

	selKnowledgeBaseEntitiesState,
	entities => entities.entities

);

export const selKBEntryNodeArray = createSelector(

	selKnowledgeBaseEntitiesState,
	state => Object.values(state.entities)

);

export const selKBEntryRootNodes = createSelector(

	selKBEntryNodeArray,
	entries => entries.filter(e => e.parentId === null)

);

// export const selKBEntriesCount = createSelector(

// 	selKBEntriesArray,
// 	entries => entries.length

// );

export const selKBEntrySelectedId = createSelector(

	selKnowledgeBaseEntitiesState,
	state => state.selected

);

export const selKBEntrySelectedEntry = createSelector(

	selKBEntriesDictionary,
	selKBEntrySelectedId,
	(dictionary, id) => id ? dictionary[id] : null

);

// export const selKBEntryContent = createSelector(

// 	selKnowledgeBaseEntitiesState,
// 	state => state.content

// );

// export const selKBEntriesTree = createSelector(

// 	selKBEntriesArray,
// 	(entries: KBEntry[]): TreeNode<KBEntry>[] => {

// 		return entries.reduce(

// 			(tree, e) => {

// 				if (tree[e.id]) {

// 					tree[e.id].data = e;
// 					tree[e.id].label = e.name;

// 				} else
// 					tree[e.id] = {
// 						key: e.id,
// 						label: e.name,
// 						data: e,
// 						children: []
// 					};

// 				const node = tree[e.id];
// 				if (e.parentId) {

// 					if (!tree[e.parentId])
// 						tree[e.parentId] = {
// 							key: e.parentId,
// 							children: []
// 						};
// 					tree[e.parentId].children!.push(node);
// 					node.parent = tree[e.parentId];

// 				}
// 				return tree;

// 			},
// 			{} as Record<UUID, TreeNode<KBEntry>>

// 		);

// 	}

// );

// export const selKBEntriesTreeAsArray = createSelector(



// );

// export const selKBEntriesParentsOfSelected = createSelector(

// 	selKBEntriesTree,
// 	selKBEntrySelectedId,
// 	(tree, selected): TreeNode<KBEntry> | null => selected ? tree[selected] : null

// );