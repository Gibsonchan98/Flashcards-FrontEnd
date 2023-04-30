import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from './interfaces/Flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardapiService {

  apiRoot : string = "https://flashcardssimpleapi.azurewebsites.net/api/Flashcard/";
  constructor(private http:HttpClient) { }

  public getAllCards() : Observable<Array<Flashcard>>{
    return this.http.get(this.apiRoot + "allflashcards") as Observable<Array<Flashcard>>;
  }

  public getCard(id:any): Observable<Flashcard>{
    return this.http.get(this.apiRoot + 'byId/' + id) as Observable<Flashcard>;
  }

  public deleteCard(id:any) : Observable<any>{
    return this.http.delete(this.apiRoot + id) as Observable<any>;
  }

  public updateCard(id:any, card: any) : Observable<any>{
    return this.http.put(this.apiRoot + "/" + id, card) as Observable<any>;
  }

  public createCard(card : Flashcard) : Observable<any>{
    return this.http.post(this.apiRoot, card, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }
   
}
