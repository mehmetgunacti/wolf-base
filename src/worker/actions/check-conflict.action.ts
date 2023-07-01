import { SyncData } from "lib";
import { ConflictDetectedError } from "worker/utils";
import { BaseAction } from "./base.action";

export class CheckConflictsAction extends BaseAction {

	async execute(): Promise<void> {

		const conflicts: SyncData[] = await this.localStorage.bookmarks.listConflicts();
		if (conflicts.length > 0)
			throw new ConflictDetectedError(conflicts.length);

	}

}