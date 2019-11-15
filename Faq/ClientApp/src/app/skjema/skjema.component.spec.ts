import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkjemaComponent } from './skjema.component';

describe('SkjemaComponent', () => {
  let component: SkjemaComponent;
  let fixture: ComponentFixture<SkjemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkjemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkjemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
