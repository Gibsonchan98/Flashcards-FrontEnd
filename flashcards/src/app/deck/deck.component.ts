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
  deckD = true;
  edit = false; 
  editedCard = {} as Flashcard;
  
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
    //pop up are you sure message
    if(window.confirm("Are you sure you want to delete this card?")){
      this.service.deleteCard(id).subscribe(data =>{
        console.log(data);
        if(data == true){
          this.router.navigate(['/Deck',this.deckCategory]);
        }
      })
    }
  }

  editCard(card : Flashcard){
    this.editedCard = card;
    this.edit = true;
    this.deckD = false;
  }

  addNewCard(){
    this.addCard = true;
  }

  saveCard(question: any, answer:any){
    if(question != '' && answer != ''){
      let card = {} as Flashcard; 
      card.question = question;
      card.answer = answer; 
      card.category = this.deckCategory;
      card.correct = false;
      this.service.createCard(card).subscribe(data => {
        if(data != null){
          console.log(data);
          console.log("show success message");
          this.router.navigate(['/Deck',this.deckCategory]);
        } else{
          console.log("show error message.");
        }
      })
    } else{
      console.log("THIS CANT BE NULL. SHOW ERROR MESSAGE")
    }
  }

  cancel(){
    this.addCard = false;
    this.edit = false;
  }
  
  saveEdit(ques : any, ans :any, id : any){
    if(ques != '' && ans != ''){
      this.editedCard.question = ques;
      this.editedCard.answer = ans; 
      this.service.getCard(id).subscribe(carddata => {
        if(carddata != null){
          this.service.updateCard(this.editedCard.id, this.editedCard).subscribe(data =>{
            this.edit = false;
            this.router.navigate(['/Deck',this.deckCategory]);
            if(data!=null){
              this.router.navigate(['/Deck',this.deckCategory]);
            }
          })
        }
      })
    }
  }

}
