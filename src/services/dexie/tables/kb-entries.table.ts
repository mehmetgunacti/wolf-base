import { KBEntriesTable, KBEntry, WolfEntity, toggleArrayItem } from 'lib';
import { UUID } from 'lib/constants/common.constant';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityTableImpl } from './entity.table';

export class DexieKBEntriesTableImpl extends EntityTableImpl<KBEntry> implements KBEntriesTable {

    constructor(db: WolfBaseDB) {
        super(db, WolfEntity.kb_entries);
    }

    protected override newItemFromPartial(item: Partial<KBEntry>): KBEntry {

        const id: UUID = uuidv4();
        return this.newInstance(id, item);

    }

    protected override newInstance(id: UUID, item: Partial<KBEntry>): KBEntry {

        const instance: KBEntry = {

            id,
            name: '',
            tags: [],
            urls: [''],
            parentId: null,
            updated: new Date().toISOString()

        };
        return { ...instance, ...item, id } as KBEntry;

    }

    async toggleTag(id: UUID, name: string): Promise<void> {

        await this.db.kb_entries
            .where({ id })
            .modify((kbEntry: KBEntry): void => {

                kbEntry.tags = toggleArrayItem(kbEntry.tags, name);

            });

    }

}