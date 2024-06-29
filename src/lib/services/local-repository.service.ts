import { EntityName, LocalRepositoryNames } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, QuoteLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';
import { WordLocalRepository } from 'lib/repositories/local/word-entry.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	words: WordLocalRepository;
	quotes: QuoteLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T>;
	dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>>;
	count(repoName: LocalRepositoryNames): Promise<number>;
	size(repoName: LocalRepositoryNames): Promise<number>;

}
