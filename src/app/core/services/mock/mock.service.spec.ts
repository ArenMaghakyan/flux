import { TestBed, inject } from '@angular/core/testing';

import { MockService } from './local.service';

describe('LocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockService]
    });
  });

  it('should be created', inject([MockService], (service: MockService) => {
    expect(service).toBeTruthy();
  }));
});
