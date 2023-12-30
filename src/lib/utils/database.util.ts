import { AsyncZippable, FlateError, zip } from "fflate";
import * as FileSaver from 'file-saver-es';
import { IDBase } from "lib/models";
import { LocalRepositoryService } from "lib/services";
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { sleep } from "./helper.tool";

const toUint8Array = <T extends IDBase>(data: T[]): Uint8Array => {

	const content: string[] = data.map(item => JSON.stringify(item));
	const json = '[\r\n' + content.join('\r\n') + ',\r\n]';
	return new TextEncoder().encode(json);

}

export class BackupDatabase {

	constructor(private localRepository: LocalRepositoryService) { }

	execute(): Observable<void> {

		return combineLatest([
			this.localRepository.bookmarks.list(),
			this.localRepository.bookmarks.listDeletedItems()
		]).pipe(
			map(([bookmarks, bookmark_trash]) => ({
				'bookmark.json': toUint8Array(bookmarks),
				'bookmark_deleted.json': toUint8Array(bookmark_trash)
			})),
			switchMap((zippable: AsyncZippable) => new Promise<void>((resolve, reject) => {

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

			}))
		);

	}

}
