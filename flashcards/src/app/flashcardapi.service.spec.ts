import { TestBed } from '@angular/core/testing';

import { FlashcardapiService } from './flashcardapi.service';

describe('FlashcardapiService', () => {
  let service: FlashcardapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
