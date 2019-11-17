import { TestBed } from '@angular/core/testing';

import { BookNowService } from './book-now.service';

describe('BookNowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookNowService = TestBed.get(BookNowService);
    expect(service).toBeTruthy();
  });
});
