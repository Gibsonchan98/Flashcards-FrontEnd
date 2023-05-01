import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeckComponent } from './deck.component';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';
import { CardComponent } from '../card/card.component';
import { MatCardModule } from '@angular/material/card';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let mockFlashcardapiService : any;
  let mockActivatedRoute;

  const mockFlashcards: Array<Flashcard> = [
    { id: 1, category: 'Math', question: 'What is 1+1?', answer: '2' },
    { id: 2, category: 'Math', question: 'What is 2+2?', answer: '4' },
  ];

  beforeEach(async () => {
    mockFlashcardapiService = jasmine.createSpyObj(['getAllCards']);
    mockFlashcardapiService.getAllCards.and.returnValue(of(mockFlashcards));

    mockActivatedRoute = {
      params: of({ category: 'Math' })
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatCardModule],
      declarations: [DeckComponent, CardComponent],
      providers: [
        { provide: FlashcardapiService, useValue: mockFlashcardapiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set deckCategory and call getCards on initialization', () => {
    expect(component.deckCategory).toBe('Math');
    expect(mockFlashcardapiService.getAllCards).toHaveBeenCalled();
  });

  it('should populate deck with flashcards of the specified category', () => {
    expect(component.deck.length).toBe(2);
    expect(component.deck[0].id).toBe(1);
    expect(component.deck[1].id).toBe(2);
  });

  it('should display the correct number of flashcards', () => {
    const numOfCardsEl = fixture.nativeElement.querySelector('#subTitle');
    expect(numOfCardsEl.textContent).toBe('Terms in set: ' + component.deck.length);
  });

  it('should display flashcards in a table', () => {
    const cardsTableEls = fixture.nativeElement.querySelectorAll('#cardsTable');
    expect(cardsTableEls.length).toBe(2);

    expect(cardsTableEls[0].querySelector('#term').textContent.trim()).toBe('Term');
    expect(cardsTableEls[0].querySelector('#definition').textContent.trim()).toBe('Definition');
    expect(cardsTableEls[0].querySelector('tbody > tr > td[headers="term card"]').textContent.trim()).toBe('What is 1+1?');
    expect(cardsTableEls[0].querySelector('tbody > tr > td[headers="definition card"]').textContent.trim()).toBe('2');

    expect(cardsTableEls[1].querySelector('#term').textContent.trim()).toBe('Term');
    expect(cardsTableEls[1].querySelector('#definition').textContent.trim()).toBe('Definition');
    expect(cardsTableEls[1].querySelector('tbody > tr > td[headers="term card"]').textContent.trim()).toBe('What is 2+2?');
    expect(cardsTableEls[1].querySelector('tbody > tr > td[headers="definition card"]').textContent.trim()).toBe('4');
  });

});
