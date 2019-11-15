import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuetsionSearchComponent } from './quetsion-search.component';

describe('QuetsionSearchComponent', () => {
  let component: QuetsionSearchComponent;
  let fixture: ComponentFixture<QuetsionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuetsionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuetsionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
