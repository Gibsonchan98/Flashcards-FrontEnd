import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Flashcard } from '../interfaces/Flashcard';
import { MatCardModule } from '@angular/material/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const flashcards: any[] = [
    { question: 'What is your name?', answer: 'My name is John' },
    { question: 'What is your age?', answer: 'I am 25 years old' },
    { question: 'What is your favorite color?', answer: 'My favorite color is blue' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        MatCardModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.flashcard = flashcards;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first flashcard question', () => {
    const questionElement = fixture.nativeElement.querySelector('#ques');
    expect(questionElement.textContent).toContain(component.flashcard[component.index].question);
  });

  it('should flip the flashcard', () => {
    const compiled = fixture.nativeElement;
    const flipSign = compiled.querySelector('#flip-sign');
    flipSign.click();
    fixture.detectChanges();
    expect(compiled.querySelector('#ans').textContent).toContain(
      flashcards[0].answer
    );
  });

  it('should go to the next flashcard', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const component = fixture.componentInstance;
    component.flashcard = [ { question: 'What is your name?', answer: 'My name is John.'},    { question: 'What is your age?', answer: 'I am 25 years old.' }  ];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#ques').textContent).toContain('What is your name?');
    component.goNext();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#ques').textContent).toContain('What is your age?');
  });

  it('should go back to the previous flashcard', () => {
  
    const compiled = fixture.debugElement.nativeElement;
    const fwdbtn = compiled.querySelector('#fwdbtn');
    fwdbtn.click();
    fixture.detectChanges();
    const backbtn = compiled.querySelector('#backbtn');
    backbtn.click();
    fixture.detectChanges();
    expect(compiled.querySelector('#ques').textContent).toContain(
      flashcards[0].question
    );
  });

  it('should render the question when flipped is false', () => {
    const questionElement = fixture.nativeElement.querySelector('#ques');
    expect(questionElement.textContent).toEqual(component.flashcard[component.index].question);
  });

  it('should not render the question when flipped is true', () => {
    component.flipped = true;
    fixture.detectChanges();
    const questionElement = fixture.nativeElement.querySelector('#ques');
    expect(questionElement).toBeFalsy();
  });

});

