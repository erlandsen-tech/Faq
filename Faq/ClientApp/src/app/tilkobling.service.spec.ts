import { TestBed } from '@angular/core/testing';

import { TilkoblingService } from './tilkobling.service';

describe('TilkoblingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TilkoblingService = TestBed.get(TilkoblingService);
    expect(service).toBeTruthy();
  });
});
