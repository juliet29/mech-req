import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LavHillComponent } from './lav-hill.component';

describe('LavHillComponent', () => {
  let component: LavHillComponent;
  let fixture: ComponentFixture<LavHillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LavHillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LavHillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
