import { Bookmark, RemoteData } from "lib/models";

export const createRemoteData = <T>(num: number, entity: T): RemoteData<T> => ({

	entity,
	metaData: {
		id: `id${num}`,
		createTime: new Date().toISOString(),
		updateTime: new Date().toISOString()
	}

});

export const createBookmark = (num: number, id?: string): Bookmark => ({

	id: id ?? `id${num}`,
	name: `name${num}`,
	title: `title${num}`,
	tags: [`tag${num}`],
	urls: [`url${num}`],
	clicks: num

});

export const createNBookmarks = (length: number, start: number = 1): Bookmark[] => {

	return Array.from(
		{ length },
		(_, index) => createBookmark(start + index)
	);

}

export const createNRemoteDataBookmarks = (length: number, start: number = 1): RemoteData<Bookmark>[] => {

	return Array.from(
		{ length },
		(_, index) => createRemoteData(start + index, createBookmark(start + index))
	);

}