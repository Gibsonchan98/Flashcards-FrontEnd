import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})

export class LoaderComponent implements AfterViewInit {  
  @ViewChild('video') video!: ElementRef

  ngAfterViewInit():void {
    console.log(this.video.nativeElement);
    
  }

  constructor(private router : Router){}
  fadeout = true;
  time : any; 

  onVideoChange(e : Event){
    this.time = this.video.nativeElement.currentTime;
    console.log(this.time);
    if(this.time > 4.5){
      this.fadeout = false;
      if(this.time > 5){
        this.router.navigateByUrl('Landing');
      }
    }
  }
}

