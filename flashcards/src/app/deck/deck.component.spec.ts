import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DeckComponent } from './deck.component';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  let service: FlashcardapiService;
  let activatedRoute: ActivatedRoute;
  let serviceSpy: jasmine.SpyObj<FlashcardapiService>;

  beforeEach(async () => {
    const serviceSpyObj = jasmine.createSpyObj('FlashcardapiService', ['getAllCards', 'getCard', 'createCard', 'deleteCard', 'updateCard']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

    await TestBed.configureTestingModule({
      declarations: [ DeckComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              category: 'test'
            }))
          }
        },
        { provide: FlashcardapiService, useValue: serviceSpyObj},
        {provide: Router, useValue: routerSpyObj}
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

  it('should get cards for the given category', () => {
    const category = 'test-category';
    const mockData = [
      { id: 1, question: 'Question 1', answer: 'Answer 1', category: 'test-category', correct: false },
      { id: 2, question: 'Question 2', answer: 'Answer 2', category: 'test-category', correct: false },
    ] as Flashcard[];
    spyOn(service, 'getAllCards').and.returnValue(of(mockData));

    activatedRoute.params = of({ category });

    component.ngOnInit();

    expect(service.getAllCards).toHaveBeenCalled();
    expect(component.deck).toEqual(mockData);
    expect(component.numOfCards).toBe(mockData.length);
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

  it('should save an edited card and navigate to deck page', () => {
    const id = 1;
    const question = 'edited question';
    const answer = 'edited answer';
    const editedCard: Flashcard = {id: id, question: question, answer: answer, category: 'test', correct: false, state :'default'};

    serviceSpy.getCard.and.returnValue(of({id: id, question: 'question', answer: 'answer', category: 'test', correct: false, state:'default'}));
    serviceSpy.updateCard.and.returnValue(of(editedCard));
    
    component.saveEdit(question, answer, id);

    expect(serviceSpy.getCard).toHaveBeenCalledWith(id);
    expect(serviceSpy.updateCard).toHaveBeenCalledWith(id, editedCard);
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Deck', 'test']);
  });

  it('should not save an edited card if question or answer is empty', () => {
    const id = '1';
    const question = '';
    const answer = 'edited answer';

    component.saveEdit(question, answer, id);

    expect(serviceSpy.getCard).not.toHaveBeenCalled();
    expect(serviceSpy.updateCard).not.toHaveBeenCalled();
    expect(component.addCard).toBeFalse();
    expect(component.edit).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });


});
