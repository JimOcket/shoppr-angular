import { TestBed } from '@angular/core/testing';

import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingListService = TestBed.get(ShoppingListService);
    expect(service).toBeTruthy();
  });
});
