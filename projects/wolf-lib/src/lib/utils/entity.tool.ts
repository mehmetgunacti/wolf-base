import { UUID } from "lib/constants";
import { KBEntry, KBEntryNode } from "lib/models";

export const toKBEntryNodes = (entries: KBEntry[]): Record<UUID, KBEntryNode> => {

	// create dictionary
	const dictionary: Record<UUID, KBEntryNode> = entries.reduce(

		(dictionary, entry) => {

			dictionary[entry.id] = { ...entry, parent: null, children: [] } as KBEntryNode;
			return dictionary;

		},
		{} as Record<UUID, KBEntryNode>

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