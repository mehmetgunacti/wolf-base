import { UUID } from '@constants';
import { HasParentId } from '@models';

export const ROOT_ID = 'ROOT_ID';

export interface TreeItem {

	value: HasParentId;
	parent: TreeItem | null;
	children: TreeItem[];
	icon: string | null;

}

export const toTreeItems = (entries: HasParentId[]): Record<UUID, TreeItem> => {

	// create dictionary
	const dictionary: Record<UUID, TreeItem> = entries.reduce(

		(dictionary, entry) => {

			const item: TreeItem = { value: entry, parent: null, children: [], icon: null };
			dictionary[entry.id] = item;
			return dictionary;

		},
		{} as Record<UUID, TreeItem>

	);

	// add remaining properties
	entries.forEach(e => {

		// if not root
		if (e.parentId) {

			// lookup parent
			const parent = dictionary[e.parentId];
			if (parent) {

				// lookup node
				const node = dictionary[e.id];
				if (node) {

					parent.children.push(node);
					node.parent = parent;

				}

			}

		}

	})
	return dictionary;

}
