import { NameBase } from '@models';
import { FIRESTORE_VALUE, FirestoreConverter } from '@utils';

export class NameBaseFirestoreConverter implements FirestoreConverter<NameBase> {

	toFirestore(item: NameBase | Partial<NameBase>): Record<keyof NameBase, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof NameBase, FIRESTORE_VALUE>;

		if (item.id)
			fields[ 'id' ] = { stringValue: item.id };

		if (item.name)
			fields[ 'name' ] = { stringValue: item.name };

		return fields;

	}

	fromFirestore(entry: NameBase): NameBase {

		// validate incoming
		let { id, name } = entry;

		if (!id)
			throw new Error(`Firestore NameBase: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore NameBase: invalid 'name' value`);

		const validated: NameBase = {

			id,
			name

		};
		return validated;

	}

	toUpdateMask(_: NameBase): string {

		// exclude some fields like id, ... from update list
		// (empty string would delete string on server)

		const fields = new Set<string>();
		fields.add('id');
		fields.add('name');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
