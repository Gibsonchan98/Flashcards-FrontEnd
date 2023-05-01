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
  
  goNext(){
    if(this.index != this.flashcard.length){
      this.index += 1;
    }
  }

  goBack(){
    if(this.index != 0){
      this.index -= 1;
    }
  }
}
