import { InjectionToken } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { RemoteRepositoryService } from '@libServices/remote-repository.service';

export const LOCAL_REPOSITORY_SERVICE = new InjectionToken<LocalRepositoryService>('LocalRepositoryService');
export const REMOTE_REPOSITORY_SERVICE = new InjectionToken<RemoteRepositoryService>('RemoteRepositoryService');
