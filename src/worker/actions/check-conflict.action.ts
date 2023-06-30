import { Action, LocalStorageService, SyncData } from "lib";
import { ConflictDetectedError } from "worker/utils";

export class CheckConflictsAction implements Action<void, Promise<void>> {

	constructor(private localStorage: LocalStorageService) { }

	async execute(): Promise<void> {

		const conflicts: SyncData[] = await this.localStorage.bookmarks.listConflicts();
		if (conflicts.length > 0)
			throw new ConflictDetectedError(conflicts.length);

	}

}