import { UUID } from "lib/constants";
import { RemoteData, RemoteMetadata } from "lib/models";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";
import { Observable } from "rxjs";

export interface RemoteStorageCollection<T extends Entity> {

	downloadOne(id: UUID): Observable<RemoteData<T> | null>;
	downloadMany(ids?: UUID[]): Observable<RemoteData<T>[]>;
	downloadIds(): Observable<RemoteMetadata[]>;

	upload(item: T): Observable<RemoteData<T>>;
	delete(id: UUID): Observable<void>;
	moveToTrash(id: UUID): Observable<void>;
	trash(item: T): Observable<RemoteData<T>>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> { }

export interface ClicksCollection {

	increase(id: UUID, amount: number): Observable<number>;
	downloadMany(): Observable<Click[]>;

}
