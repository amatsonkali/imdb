import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreatePersonaComponent } from './movie-create-persona.component';

describe('MovieCreatePersonaComponent', () => {
  let component: MovieCreatePersonaComponent;
  let fixture: ComponentFixture<MovieCreatePersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCreatePersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCreatePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
