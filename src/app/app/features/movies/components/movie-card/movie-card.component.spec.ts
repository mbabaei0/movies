import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let debugElement: DebugElement;

  const mockMovie = {
    Title: 'Inception',
    Type: 'movie',
    Year: '2010',
    Poster: 'https://example.com/inception.jpg',
    imdbID: 'tt1375666'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the movie title and type', () => {
    const title = debugElement.query(By.css('[data-testingId="title"]')).nativeElement;
    const subtitle = debugElement.query(By.css('[data-testingId="subtitle"]')).nativeElement;
    expect(title.textContent).toContain(mockMovie.Title);
    expect(subtitle.textContent).toContain(mockMovie.Type);
  });

  it('should display the movie poster', () => {
    const image = debugElement.query(By.css('[data-testingId="poster"]')).nativeElement;
    expect(image.src).toContain(mockMovie.Poster);
    expect(image.alt).toBe(mockMovie.Title);
  });

  it('should display the movie year', () => {
    const content = debugElement.query(By.css('[data-testingId="content"]')).nativeElement;
    expect(content.textContent).toContain(`Made in ${mockMovie.Year}`);
  });

  it('should have a router link to the movie details', () => {
    const button = debugElement.query(By.css('[data-testingId="detail-btn"]')).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe(mockMovie.imdbID);
  });

  it('should have a link to the IMDb page', () => {
    const imdbLink = debugElement.query(By.css('[data-testingId="linkimdb"]')).nativeElement;
    expect(imdbLink.href).toContain(`https://www.imdb.com/title/${mockMovie.imdbID}`);
  });
});
