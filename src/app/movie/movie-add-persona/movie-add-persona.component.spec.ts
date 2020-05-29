import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddPersonaComponent } from './movie-add-persona.component';

describe('MovieAddPersonaComponent', () => {
  let component: MovieAddPersonaComponent;
  let fixture: ComponentFixture<MovieAddPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
