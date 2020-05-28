import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaModalComponent } from './persona-modal.component';

describe('PersonaModalComponent', () => {
  let component: PersonaModalComponent;
  let fixture: ComponentFixture<PersonaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
