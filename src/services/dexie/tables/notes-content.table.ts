import { NoteContent, UUID, WolfEntity } from '@lib';
import { NoteContentLocalRepository } from 'lib/repositories/local';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieNoteContentRepositoryImpl extends EntityLocalRepositoryImpl<NoteContent> implements NoteContentLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.note_content);
	}

	protected override newItemFromPartial(item: NoteContent): NoteContent {

		return this.newInstance(item.id, item);

	}

	protected override newInstance(id: UUID, item: NoteContent): NoteContent {

		const instance: NoteContent = {

			id,
			name: '',
			content: ''

		};
		return { ...instance, ...item, id } as NoteContent;

	}

}
