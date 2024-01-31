import Dexie from 'dexie';
import { CONF_KEYS, DEFAULT_CONF_VALUES, LocalRepositoryNames } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { LogMessage, Note, RemoteMetadata, SyncData } from 'lib/models';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { DexieConfiguration } from 'lib/models/database.model';

export const wolfBaseDBFactory = (): WolfBaseDB => {

	return new WolfBaseDB({

		dbName: 'WolfBaseDB',
		tables: {

			// bookmarks
			bookmarks: 'id',
			bookmarks_sync: 'id',
			bookmarks_trash: '++, id, name',
			bookmarks_remote: 'id',
			bookmarks_clicks: 'id, current',

			// notes
			notes: 'id, name',
			notes_sync: 'id',
			notes_trash: '++, id, name',
			notes_remote: 'id',

			// note content
			note_content: 'id, name, content',
			note_content_sync: 'id',
			note_content_trash: '++, id, name',
			note_content_remote: 'id',

			// configuration
			configuration: '',

			// logs
			logs: '++id, category, entityId'

		},
		version: 5

	});

};

export class WolfBaseDB extends Dexie {

	// bookmarks
	bookmarks: Dexie.Table<Bookmark, UUID>;
	bookmarks_sync: Dexie.Table<SyncData, UUID>;
	bookmarks_remote: Dexie.Table<RemoteMetadata, UUID>;
	bookmarks_trash: Dexie.Table<Bookmark, number>;
	bookmarks_clicks: Dexie.Table<Click, UUID>;

	// notes
	notes: Dexie.Table<Note, UUID>;
	notes_sync: Dexie.Table<SyncData, UUID>;
	notes_remote: Dexie.Table<RemoteMetadata, UUID>;
	notes_trash: Dexie.Table<Note, number>;

	// note content
	note_content: Dexie.Table<string, UUID>;
	note_content_sync: Dexie.Table<SyncData, UUID>;
	note_content_remote: Dexie.Table<RemoteMetadata, UUID>;
	note_content_trash: Dexie.Table<string, number>;

	configuration: Dexie.Table<string | boolean, CONF_KEYS>;
	logs: Dexie.Table<LogMessage, number>;

	constructor(conf: DexieConfiguration) {

		super(conf.dbName);
		this.version(conf.version)
			.stores(conf.tables);

		this.bookmarks = this.table(LocalRepositoryNames.bookmarks);
		this.bookmarks_sync = this.table(LocalRepositoryNames.bookmarks_sync);
		this.bookmarks_remote = this.table(LocalRepositoryNames.bookmarks_remote);
		this.bookmarks_trash = this.table(LocalRepositoryNames.bookmarks_trash);
		this.bookmarks_clicks = this.table(LocalRepositoryNames.bookmarks_clicks);

		this.notes = this.table(LocalRepositoryNames.notes);
		this.notes_sync = this.table(LocalRepositoryNames.notes_sync);
		this.notes_remote = this.table(LocalRepositoryNames.notes_remote);
		this.notes_trash = this.table(LocalRepositoryNames.notes_trash);

		this.note_content = this.table(LocalRepositoryNames.note_content);
		this.note_content_sync = this.table(LocalRepositoryNames.note_content_sync);
		this.note_content_remote = this.table(LocalRepositoryNames.note_content_remote);
		this.note_content_trash = this.table(LocalRepositoryNames.note_content_trash);

		this.configuration = this.table(LocalRepositoryNames.configuration);
		this.logs = this.table(LocalRepositoryNames.logs);

		this.on('populate', () => {

			this.configuration.put(DEFAULT_CONF_VALUES.syncWorkerActive, CONF_KEYS.syncWorkerActive);
			this.configuration.put(DEFAULT_CONF_VALUES.sidebarState, CONF_KEYS.sidebarVisible);
			this.configuration.put(DEFAULT_CONF_VALUES.theme, CONF_KEYS.theme);

		});

	}

}

