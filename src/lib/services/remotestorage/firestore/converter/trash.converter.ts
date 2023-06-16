import { WolfBaseTableName } from "lib/constants";
import { Trash } from "lib/models";
import { FIRESTORE_VALUE, FirestoreConverter, FirestoreDocument } from "lib/utils";
import { BookmarkFirestoreConverter } from "./bookmark.converter";

export class TrashFirestoreConverter implements FirestoreConverter<Trash> {

    toFirestore(trash: Trash): Record<keyof Trash, FIRESTORE_VALUE> {

        const fields = {} as Record<keyof Trash, FIRESTORE_VALUE>;
        fields['table'] = { stringValue: trash.table };

        if (trash.table === WolfBaseTableName.bookmarks)
            fields['entity'] = {
                mapValue: { fields: new BookmarkFirestoreConverter().toFirestore(trash.entity) }
            };

        return fields;

    }

    toUpdateMask(trash: Partial<Trash>): string {

        // exclude some fields like id, ... from update list
        // 'created' is never updated

        const fields = new Set<string>();

        if (trash.entity)
            fields.add('entity');

        if (trash.table)
            fields.add('table');

        return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

    }

}