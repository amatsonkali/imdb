import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCalifComponent } from './movie-calif.component';

describe('MovieCalifComponent', () => {
  let component: MovieCalifComponent;
  let fixture: ComponentFixture<MovieCalifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCalifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCalifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
