import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MudorComponent } from './mudor.component';

describe('MudorComponent', () => {
  let component: MudorComponent;
  let fixture: ComponentFixture<MudorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MudorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
