import { AppEntityType, LocalRepositoryNames } from '@constants';
import { Entity } from '@models';
import * as repo from '@repositories';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: repo.BookmarksLocalRepository;
	notes: repo.NotesLocalRepository;
	noteContent: repo.NoteContentLocalRepository;
	projects: repo.ProjectLocalRepository;
	quizEntries: repo.QuizEntryLocalRepository;
	quotes: repo.QuoteLocalRepository;
	tasks: repo.TaskLocalRepository;
	words: repo.WordLocalRepository;

	// non-entity tables
	configuration: repo.ConfigurationLocalRepository;
	logs: repo.LogsLocalRepository;

	getRepository<T extends Entity>(entityType: AppEntityType): repo.EntityLocalRepository<T>;
	dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>>;
	count(table: string): Promise<number>;
	size(table: string): Promise<number>;
	empty(table: string): Promise<void>;

}
