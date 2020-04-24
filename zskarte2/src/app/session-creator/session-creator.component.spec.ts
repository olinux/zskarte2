import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreatorComponent } from './session-creator.component';

describe('SessionCreatorComponent', () => {
  let component: SessionCreatorComponent;
  let fixture: ComponentFixture<SessionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
