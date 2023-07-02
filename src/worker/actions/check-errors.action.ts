import { SyncData } from "lib";
import { ErrorDetected } from "worker/utils";
import { BaseAction } from "./base.action";

export class CheckErrorsAction extends BaseAction {

	async execute(): Promise<void> {

		const errors: SyncData[] = await this.localStorage.bookmarks.listErrors();
		if (errors.length > 0)
			throw new ErrorDetected(errors.length);

	}

}