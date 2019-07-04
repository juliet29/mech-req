import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSelectComponent } from './plant-select.component';

describe('PlantSelectComponent', () => {
  let component: PlantSelectComponent;
  let fixture: ComponentFixture<PlantSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
