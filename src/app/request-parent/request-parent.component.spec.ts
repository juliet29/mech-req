import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestParentComponent } from './request-parent.component';

describe('RequestParentComponent', () => {
  let component: RequestParentComponent;
  let fixture: ComponentFixture<RequestParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
