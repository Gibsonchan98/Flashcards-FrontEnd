import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { DeckComponent } from './deck.component';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let router: Router;
  let service: FlashcardapiService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              category: 'category'
            }))
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    service = TestBed.inject(FlashcardapiService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cards', () => {
    const mockData = [
      { id: 1, question: 'What is your name?', answer: 'My name is John', category: 'category', correct: false },
      { id: 2, question: 'What is your age?', answer: 'I am 30 years old', category: 'category', correct: false }
    ] as Flashcard[];
    spyOn(service, 'getAllCards').and.returnValue(of(mockData));
    component.getCards('category');
    expect(component.deck.length).toBe(2);
  });

  it('should delete card', () => {
    const spy = spyOn(service, 'deleteCard').and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(router, 'navigateByUrl');
    component.deleteCard(1);
    expect(spy).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/Deck/category');
  });

  it('should edit card', () => {
    const mockCard = { id: 1, question: 'What is your name?', answer: 'My name is John', category: 'category', correct: false } as Flashcard;
    component.editCard(mockCard);
    expect(component.editedCard).toBe(mockCard);
    expect(component.edit).toBeTrue();
    expect(component.deckD).toBeFalse();
  });

  it('should add new card', () => {
    component.addNewCard();
    expect(component.addCard).toBeTrue();
  });

  it('should save card', () => {
    const mockCard = { question: 'What is your name?', answer: 'My name is John', category: 'category', correct: false } as Flashcard;
    const spy = spyOn(service, 'createCard').and.returnValue(of(mockCard));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.saveCard('What is your name?', 'My name is John');
    expect(spy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/Deck/category');
  });

  it('should cancel', () => {
    component.cancel();
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();
  });

  it('should save edit', () => {
    const mockCard = { question: 'What is your name?', answer: 'My name is John', category: 'category', correct: false } as Flashcard;
    const spy = spyOn(service, 'updateCard').and.returnValue(of(mockCard));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.saveEdit('What is your name?', 'My name is John', 10);
    expect(spy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/Deck/category');
  });

});
