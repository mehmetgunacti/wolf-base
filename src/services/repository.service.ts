import { InjectionToken } from '@angular/core';
import { LocalRepositoryService, RemoteRepositoryService } from '@libServices';

export const LOCAL_REPOSITORY_SERVICE = new InjectionToken<LocalRepositoryService>('LocalRepositoryService');
export const REMOTE_REPOSITORY_SERVICE = new InjectionToken<RemoteRepositoryService>('RemoteRepositoryService');
