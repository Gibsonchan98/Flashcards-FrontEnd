import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';
import { FlashcardDeck } from '../interfaces/FlashcardDeck';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit{
  constructor(private router : Router, private service : FlashcardapiService){}

  flashdecks: Array<FlashcardDeck> = [];

  ngOnInit(): void {
    let carddeck = {} as FlashcardDeck;
    carddeck.category = "Math"; 
    carddeck.length = 10; 
    let carddeck2 = {} as FlashcardDeck; 
    carddeck2.category = "English"; 
    carddeck2.length = 15;
    this.flashdecks.push(carddeck);
    this.flashdecks.push(carddeck2); 
  }
  
  getCards(){
    //gets cards
  }

  goToDeck( category : any){

  }

  createDeck(){
    this.router.navigateByUrl('Create');
  }
}
