import { Component, OnInit} from '@angular/core';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{
  
  deckCategory:any;
  numOfCards : any;
  deck : Array<Flashcard> = [];
  addCard = false;

  constructor(private router : Router, private activatedRoute: ActivatedRoute, private service :FlashcardapiService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.deckCategory = params['category'];
      this.getCards(this.deckCategory);
    })
  }
  
  getCards(category: any){
    this.service.getAllCards().subscribe(data => {
      if(data != null){
        for(let i = 0; i < data.length; i++){
          if(category == data[i].category){
            let card = {} as Flashcard;
            card = data[i];
            console.log(card);
            this.deck.push(data[i]);
          }
        }
        this.numOfCards = this.deck.length;
      }
    })
  }

  goBackToLibrary(){
    this.router.navigateByUrl('Library');
  }

  deleteCard(id : any){
    console.log("delete " + id);
  }

  editCard(id : any, question : any, answer : any, correct : any){
    console.log("delete " + id);
  }

  addNewCard(){
    this.addCard = true;
    console.log(this.addCard);
  }
  

}
