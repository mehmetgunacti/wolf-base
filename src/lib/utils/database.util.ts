import { DbStore } from '@constants/database.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { AsyncZippable, FlateError, zip } from 'fflate';
import * as FileSaver from 'file-saver-es';
import { Observable, concatMap, delay, from, map, switchMap, toArray } from 'rxjs';
import { sleep } from './helper.tool';

const encode = <T>(data: Record<string, T>): Uint8Array => new TextEncoder().encode(JSON.stringify(data, null, '\t'));

export class BackupDatabase {

	constructor(private localRepository: LocalRepositoryService) { }

	execute(): Observable<void> {

		return from(Object.values(DbStore)).pipe(

			// filter(name => name !== LocalRepositoryNames.configuration),
			concatMap(name =>

				// return tuple [filename, uint8array]
				from(this.localRepository.dump(name)).pipe(
					map((dump): [ string, Uint8Array ] => [ `${name}.json`, encode(dump) ]),
					delay(100)
				)

			),
			toArray(),
			map(a => a.reduce((p, c) => { p[ c[ 0 ] ] = c[ 1 ]; return p; }, {} as AsyncZippable)),
			switchMap((zippable: AsyncZippable) => new Promise<void>((resolve, reject) => {

				zip(zippable, { level: 9 }, async (err: FlateError | null, data: Uint8Array) => {

					if (err) {

						reject(err.message);
						return;

					}

					// Generate the zip file
					const content: Blob = new Blob([ data ], { type: 'application/zip' });

					// save zip file
					FileSaver.saveAs(content, `wolf-base_${new Date().toISOString()}.zip`);
					await sleep(500);
					resolve();

				});

			}))

		);

	}

}
