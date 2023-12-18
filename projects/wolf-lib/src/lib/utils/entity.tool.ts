import { UUID } from "lib/constants";
import { Note, NoteNode } from 'lib/models';

export const toNoteNodes = (entries: Note[]): Record<UUID, NoteNode> => {

	// create dictionary
	const dictionary: Record<UUID, NoteNode> = entries.reduce(

		(dictionary, entry) => {

			dictionary[entry.id] = { ...entry, parent: null, children: [] } as NoteNode;
			return dictionary;

		},
		{} as Record<UUID, NoteNode>

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
