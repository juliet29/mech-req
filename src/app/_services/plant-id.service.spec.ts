import { TestBed } from '@angular/core/testing';

import { PlantIdService } from './plant-id.service';

describe('PlantIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantIdService = TestBed.get(PlantIdService);
    expect(service).toBeTruthy();
  });
});
