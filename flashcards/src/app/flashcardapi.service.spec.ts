import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardapiService } from './flashcardapi.service';
import { Flashcard } from './interfaces/Flashcard';

describe('FlashcardapiService', () => {
  let service: FlashcardapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlashcardapiService]
    });
    service = TestBed.inject(FlashcardapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all flashcards', () => {
    const mockCards: any[] = [{ id: 1, question: 'Q1', answer: 'A1', correct: true, category: 'C1' }, { id: 2, question: 'Q2', answer: 'A2', correct: false, category: 'C2' }];

    service.getAllCards().subscribe(cards => {
      expect(cards.length).toBe(2);
      expect(cards).toEqual(mockCards);
    });

    const req = httpMock.expectOne(`${service.apiRoot}allflashcards`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCards);
  });

  it('should return a single flashcard by id', () => {
    const mockCard: any = { id: 1, question: 'Q1', answer: 'A1', correct: true, category: 'C1' };

    service.getCard(1).subscribe(card => {
      expect(card).toEqual(mockCard);
    });

    const req = httpMock.expectOne(`${service.apiRoot}byId/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCard);
  });

  it('should delete a flashcard by id', () => {
    service.deleteCard(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiRoot}1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

  it('should update a flashcard by id', () => {
    const mockCard: any = { id: 1, question: 'Q1', answer: 'A1', correct: true, category: 'C1' };

    service.updateCard(1, mockCard).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiRoot}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCard);
    req.flush(true);
  });

  it('should create a new flashcard', () => {
    const mockCard: any = { id: 1, question: 'Q1', answer: 'A1', correct: true, category: 'C1' };

    service.createCard(mockCard).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(service.apiRoot);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCard);
    req.flush(true);
  });
});
