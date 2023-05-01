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
  let mockRouter : any;
  let flashServiceSpy : jasmine.SpyObj<FlashcardapiService>;

  const mockFlashcards: Array<Flashcard> = [
    { id: 1, category: 'Math', question: 'What is 1+1?', answer: '2' },
    { id: 2, category: 'Math', question: 'What is 2+2?', answer: '4' },
  ];

  beforeEach(async () => {
    mockFlashcardapiService = jasmine.createSpyObj(['getAllCards', 'getCard', 'createCard','updateCard', 'deleteCard']);
    const spy = jasmine.createSpyObj('FlashcardapiService', ['deleteCard']);
    mockFlashcardapiService.getAllCards.and.returnValue(of(mockFlashcards));
    mockFlashcardapiService.updateCard.and.returnValue(of(mockFlashcards));
    mockFlashcardapiService.getCard.and.returnValue(of(mockFlashcards));
    mockFlashcardapiService.createCard.and.returnValue(of(mockFlashcards));
    mockRouter = jasmine.createSpyObj(['navigateByUrl', 'navigate']);

    mockActivatedRoute = {
      params: of({ category: 'Math' })
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatCardModule],
      declarations: [DeckComponent, CardComponent],
      providers: [
        { provide: FlashcardapiService, useValue: spy},
        { provide: FlashcardapiService, useValue: mockFlashcardapiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

      flashServiceSpy = TestBed.inject(FlashcardapiService) as jasmine.SpyObj<FlashcardapiService>;
      flashServiceSpy.getAllCards.and.returnValue(of(mockFlashcards));
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

  it('should cancel', () => {
    component.cancel();
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();
  });

  it('should add new card', () => {
    component.addNewCard();
    expect(component.addCard).toBeTrue();
  });

  it('should create a new flashcard and reload the component', () => {
    const question = 'What is the capital of France?';
    const answer = 'Paris';
    const card: Flashcard = {
      question,
      answer,
      category: 'Math',
      correct: false,
    };

    const spy = spyOn(component, 'reloadComponent').and.callThrough();

    component.saveCard(question, answer);

    expect(mockFlashcardapiService.createCard).toHaveBeenCalledWith(card);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not create a new flashcard when question or answer is empty', () => {
    const spy = spyOn(component, 'reloadComponent').and.callThrough();
    component.saveCard('', 'answer');
    expect(mockFlashcardapiService.createCard).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();

    component.saveCard('question', '');
    expect(mockFlashcardapiService.createCard).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call the service to delete a card and reload the component if confirmed', () => {
    const id = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    flashServiceSpy.deleteCard.and.returnValue(of(true));
    const spy = spyOn(component, 'reloadComponent').and.callThrough();
    component.deleteCard(id);

    expect(flashServiceSpy.deleteCard).toHaveBeenCalledWith(id);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not call the service to delete a card or reload the component if not confirmed', () => {
    const id = 1;
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(component, 'reloadComponent').and.callThrough();
    component.deleteCard(id);

    expect(flashServiceSpy.deleteCard).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should set editedCard, edit, and deckD variables correctly', () => {
    const sampleCard: Flashcard = { id: 1, category: 'Math', question: 'What is 2+2?', answer: '4' };
    component.editCard(sampleCard);
    expect(component.editedCard).toEqual(sampleCard);
    expect(component.edit).toBeTrue();
    expect(component.deckD).toBeFalse();
  });

  it('should update a card and reload the component if valid question and answer are provided', () => {
    // create a sample edited card
    const editedCard = { id: 1, question: 'new question', answer: 'new answer' };
    component.editedCard = editedCard;

    // spy on service methods
    const spy = spyOn(component, 'reloadComponent').and.callThrough();

    // call saveEdit function with valid question and answer
    component.saveEdit('new question', 'new answer', 1);

    // expect editedCard to be updated
    expect(component.editedCard.question).toEqual('new question');
    expect(component.editedCard.answer).toEqual('new answer');

    // expect service methods to have been called with correct arguments
    expect(mockFlashcardapiService.getCard).toHaveBeenCalledWith(1);
    expect(mockFlashcardapiService.updateCard).toHaveBeenCalledWith(1, editedCard);

    // expect addCard and edit flags to be set to false
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();

    // expect reloadComponent to have been called with true argument
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not update a card and reload the component if question or answer is empty', () => {
    // create a sample edited card
    const editedCard = { id: 1, question: 'new question', answer: 'new answer' };
    component.editedCard = editedCard;

    const spy = spyOn(component, 'reloadComponent').and.callThrough();

    // call saveEdit function with empty question
    component.saveEdit('', 'new answer', 1);

    // expect editedCard to not be updated
    expect(component.editedCard.question).toEqual('new question');
    expect(component.editedCard.answer).toEqual('new answer');

    // expect service methods to not have been called
    expect(mockFlashcardapiService.getCard).not.toHaveBeenCalled();
    expect(mockFlashcardapiService.updateCard).not.toHaveBeenCalled();

    // expect addCard and edit flags to be set to false
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();

  });
});
