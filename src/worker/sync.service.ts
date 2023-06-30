import { SyncEvent } from "lib";

export class SyncService {

    post(event: SyncEvent): void {

        postMessage(event);

    }

}