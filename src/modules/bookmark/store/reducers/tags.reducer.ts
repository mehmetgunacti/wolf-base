import { Action, createReducer, on } from '@ngrx/store';
import { Tag } from 'lib';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.tagsInitialState,

	on(

		fromActions.tagsToggleTagCloudVisibility,
		state => ({

			...state,
			tagCloudVisible: !state.tagCloudVisible

		})

	),

	// on(

	// 	fromActions.bookmarksSearchSuccess,
	// 	(state, { bookmarks }) => {

	// 		const setOfTags: Set<string> = new Set<string>();
	// 		bookmarks.map(b => b.tags.forEach(t => setOfTags.add(t)));

	// 		const selectedTags: { [key: string]: boolean } = {};
	// 		setOfTags.forEach(id => selectedTags[id] = true);
	// 		return { ...state, selected: { ...selectedTags } };

	// 	}

	// ),

	// on(

	// 	fromActions.tagsLoadAllSuccess,
	// 	(state, { tags }) => {
	// 		// create tag objects into a set
	// 		// calculate count of each tag
	// 		// const tmpTags: { [key: string]: number } = {};
	// 		// bookmarks.forEach(
	// 		// 	b => b.tags.forEach(
	// 		// 		tag => tmpTags[tag] = !!tmpTags[tag] ? (tmpTags[tag] + 1) : 1
	// 		// 	)
	// 		// );

	// 		// // create ITag array and return to be put in store
	// 		// const tags: ITag[] = Object.keys(tmpTags).map(id => ({ id, count: tmpTags[id] } as ITag));
	// 		return fromStates.tagsAdapter.setAll(tags, { ...state, selected: {}, tagCloudVisible: false });
	// 	}

	// ),

	on(

		fromActions.bookmarksLoadAllSuccess,
		(state, { bookmarks }) => {

			const mapTags = new Map<string, number>();
			bookmarks
				.flatMap(b => b.tags)
				.forEach(tag => {
					mapTags.set(tag, (mapTags.get(tag) ?? 0) + 1);
				});

			const tags: Tag[] = [];
			mapTags.forEach(
				(count, name) => { tags.push({ name, count }); }
			);
			return { ...state, tags };

		}

	),

	on(

		fromActions.tagsSelect,
		(state, { name }) => {

			if (state.selected.indexOf(name) >= 0) // tag already selected
				return state;
			return { ...state, selected: [...state.selected, name] };

		}

	),

	on(

		fromActions.tagsDeselect,
		(state, { name }) => {

			if (state.selected.indexOf(name) < 0) // tag not selected
				return state;
			return { ...state, selected: state.selected.filter(t => t !== name) };

		}

	)

	// on(

	// 	fromActions.tagsSetPopularTag,
	// 	state => ({

	// 		...state,
	// 		selected: {},
	// 		tagCloudVisible: false

	// 	})

	// )
	// on(fromActions.tagsSearch, (state, { term }) => {

	// 	const selectedTags: { [key: string]: boolean } = {};
	// 	(state.ids as string[])
	// 		.filter(tagName => tagName.startsWith(term))
	// 		.map(tagName => selectedTags[tagName] = true);

	// 	return { ...state, selected: { ...selectedTags } };
	// })
);

// The exported reducer function: This is because function calls are not supported by the AOT compiler.
export function tagsReducer(state: fromStates.TagsState | undefined, action: Action): fromStates.TagsState {
	return reducer(state, action);
}
