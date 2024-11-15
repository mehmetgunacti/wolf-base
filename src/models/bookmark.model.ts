import { UUID } from '@constants/common.constant';
import { checkNonEmptyArray, checkString } from '@utils/validators';
import { AbstractEntity, Entity } from './entity.model';
import { IdBase, NameBase } from './id-base.model';

export interface Bookmark extends Entity {

	title: string;
	tags: string[];
	urls: string[];
	image?: string;

}

export interface ClickedBookmark extends Bookmark {

	clicks: number;

}

export interface Click extends IdBase {

	total: number;
	current: number;

}

export interface NamedClick extends Click, NameBase { }

export interface BookmarkQueryParams {

	id: UUID | null,
	search: string | null,
	tags: string[];

}

export class BookmarkValidator extends AbstractEntity implements Bookmark {

	readonly title: string;
	readonly tags: string[];
	readonly image?: string | undefined;
	readonly urls: string[];

	/** createId: if false, value.id has to be a valid UUID */
	protected constructor(value: Partial<Bookmark>, createId: boolean) {

		super(value, createId);
		this.urls = checkNonEmptyArray(value.urls);
		this.tags = checkNonEmptyArray(value.tags);
		this.title = checkString(value.title);

	}

	static getInstance(value: Partial<Bookmark>, createId: boolean = false): BookmarkValidator {

		return new BookmarkValidator(value, createId);

	}

	override value(): Bookmark {

		const { id, name, title, urls, tags } = this;
		const value: Bookmark = { id, name, title, urls, tags };
		return value;

	};

}
