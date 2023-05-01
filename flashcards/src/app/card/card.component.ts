import { Component, Input} from '@angular/core';
import { Flashcard } from '../interfaces/Flashcard';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() flashcard!:Flashcard[];

  index:any = 0;
  flipped = false;

  goNext(){
    if(this.index != this.flashcard.length-1){
      this.index += 1;
    }
  }

  goBack(){
    if(this.index != 0){
      this.index -= 1;
    }
  }

  flipCard(){
    if(this.flipped == true){
      this.flipped = false;
    } else {
      this.flipped = true;
    }  
  }

}
