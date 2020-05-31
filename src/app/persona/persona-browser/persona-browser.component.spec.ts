import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaBrowserComponent } from './persona-browser.component';

describe('PersonaBrowserComponent', () => {
  let component: PersonaBrowserComponent;
  let fixture: ComponentFixture<PersonaBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
