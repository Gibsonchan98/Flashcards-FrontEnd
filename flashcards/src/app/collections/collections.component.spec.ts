import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FlashcardapiService } from '../flashcardapi.service';
import { CollectionsComponent } from './collections.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;
  let routerSpy: any;
  let flashcardapiServiceSpy: any;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj(['navigate']);
    flashcardapiServiceSpy = jasmine.createSpyObj(['getAllCards']);

    await TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: FlashcardapiService, useValue: flashcardapiServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call getCards', () => {
    spyOn(component, 'getCards');

    component.ngOnInit();

    expect(component.getCards).toHaveBeenCalled();
  });

  it('should call getAllCards on FlashcardapiService', () => {
    flashcardapiServiceSpy.getAllCards.and.returnValue(of([]));

    component.getCards();

    expect(flashcardapiServiceSpy.getAllCards).toHaveBeenCalled();
  });

  it('should set flashdecks when data is returned', () => {
    const mockCards: Array<any> = [
      { id: 1, category: 'test', question: 'test', answer: 'test' },
      { id: 2, category: 'test', question: 'test', answer: 'test' },
    ];
    flashcardapiServiceSpy.getAllCards.and.returnValue(of(mockCards));

    component.getCards();

    expect(component.flashdecks.length).toBe(1);
    expect(component.flashdecks[0].category).toBe('test');
    expect(component.flashdecks[0].length).toBe(2);
  });

  it('should navigate to /Create', () => {
    component.createDeck();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('Create');
  });

  it('should navigate to /Deck/:category', () => {
    const category = 'test';

    component.goToDeck(category);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/Deck', category]);
  });

});







