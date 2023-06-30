import { RemoteMetadata } from "lib";

export class MetadataList {

    constructor(private list: RemoteMetadata[]) {}

    getList(): RemoteMetadata[] {

        return this.list;

    }

    replace(newList: RemoteMetadata[]) {

        this.list = newList;

    }

    find(filterFn: (value: RemoteMetadata, index: number, array: RemoteMetadata[]) => boolean): RemoteMetadata | undefined {

        return this.list.find(filterFn);

    }

}