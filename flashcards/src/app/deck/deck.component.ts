import { Component, OnInit} from '@angular/core';
import { FlashcardapiService } from '../flashcardapi.service';
import { Flashcard } from '../interfaces/Flashcard';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{
  
  deckCategory:any;
  numOfCards : any;
  constructor(private router : Router, private service :FlashcardapiService){}

  ngOnInit(): void {
    this.deckCategory = "Math"
    this.numOfCards = 3;
  }

  goBackToLibrary(){
    this.router.navigateByUrl('Library');
  }
}
