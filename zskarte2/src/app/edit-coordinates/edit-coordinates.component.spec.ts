import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditCoordinatesComponent} from './edit-coordinates.component';

describe('EditCoordinatesComponent', () => {
  let component: EditCoordinatesComponent;
  let fixture: ComponentFixture<EditCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
