import { TestBed } from '@angular/core/testing';

import { WolfLibService } from './wolf-lib.service';

describe('WolfLibService', () => {
  let service: WolfLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WolfLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
