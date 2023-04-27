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

  constructor(private router : Router, private activatedRoute: ActivatedRoute, private service :FlashcardapiService){}

  ngOnInit(): void {
    this.numOfCards = 3;
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);
      this.deckCategory = params['category'];
    })
  }

  goBackToLibrary(){
    this.router.navigateByUrl('Library');
  }
}
