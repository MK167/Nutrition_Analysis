import { TestBed } from '@angular/core/testing';

import { NutritionServiceService } from './nutrition-service.service';

describe('NutritionServiceService', () => {
  let service: NutritionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
