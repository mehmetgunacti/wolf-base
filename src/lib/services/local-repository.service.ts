import { EntityName, LocalRepositoryNames } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T>;
	dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>>;

}
