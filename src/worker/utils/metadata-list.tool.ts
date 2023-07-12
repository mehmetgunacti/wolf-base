import { RemoteMetadata, UUID } from "lib";

export class MetadataList {

    private map: Map<UUID, RemoteMetadata> = new Map();

    constructor(list: RemoteMetadata[] = []) {

        this.setItems(list);

    }

    getItems(): RemoteMetadata[] {

        return Array.from(this.map.values());

    }

    setItems(newList: RemoteMetadata[]) {

        newList.forEach(item => this.map.set(item.id, item));

    }

    get(id: UUID): RemoteMetadata | undefined {

        return this.map.get(id);

    }

    set(item: RemoteMetadata): void {

        this.map.set(item.id, item);

    }

    remove(id: UUID): void {

        this.map.delete(id);

    }

}