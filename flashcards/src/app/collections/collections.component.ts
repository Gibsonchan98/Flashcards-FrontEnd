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
    this.getCards();
  }
  
  getCards(){
    //gets cards
    let decks: Array<FlashcardDeck> = [];
    let cards: Array<Flashcard> = [];
    this.service.getAllCards().subscribe(data => {
      console.log(data);
      if(data != null){
        cards = data;
        for(let i = 0; i < data.length; i++){
          let carddeck = {} as FlashcardDeck;
          let category:any;
          category = data[i].category;
          if(category != null && category != ''){
            carddeck.category = category;
            console.log(category);
            let num = 0; 
            for(let j = i; j < data.length; j++){
              if(category == cards[j].category && cards[j].category !=  null && category != null){
                num += 1; 
                cards[j].category = "";
              }
            } 
            carddeck.length = num;
            decks.push(carddeck);
            this.flashdecks.push(carddeck);
          }
        }
        console.log(decks);
      }
    })
  }

  goToDeck( category : any){
    console.log(category);
  }

  createDeck(){
    this.router.navigateByUrl('Create');
  }
}
