import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStateComponent } from './tag-state.component';

describe('TagStateComponent', () => {
  let component: TagStateComponent;
  let fixture: ComponentFixture<TagStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
