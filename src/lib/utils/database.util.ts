import { AsyncZippable, FlateError, zip } from "fflate";
import * as FileSaver from 'file-saver-es';
import { Bookmark, IDBase } from "lib/models";
import { LocalStorageService } from "lib/services";
import { sleep } from "./helper.tool";

const toUint8Array = <T extends IDBase>(data: T[]): Uint8Array => {

	const content: string[] = data.map(item => JSON.stringify(item));
	const json = '[\r\n' + content.join('\r\n') + ',\r\n]';
	return new TextEncoder().encode(json);

}

export class BackupDatabase {

	constructor(private localStorage: LocalStorageService) { }

	async execute(): Promise<void> {

		const bookmarks: Bookmark[] = await this.localStorage.bookmarks.list();
		const bookmark_trash: Bookmark[] = await this.localStorage.bookmarks.listDeletedItems();

		const zippable: AsyncZippable = {
			'bookmark.json': toUint8Array(bookmarks),
			'bookmark_deleted.json': toUint8Array(bookmark_trash)
		};

		return new Promise((resolve, reject) => {

			zip(zippable, { level: 9 }, async (err: FlateError | null, data: Uint8Array) => {

				if (err) {

					reject(err.message);
					return;

				}

				// Generate the zip file
				const content: Blob = new Blob([data], { type: 'application/zip' });

				// save zip file
				FileSaver.saveAs(content, `backup_${new Date().toISOString()}.zip`);
				await sleep(1000);
				resolve();

			});

		});

	}

}