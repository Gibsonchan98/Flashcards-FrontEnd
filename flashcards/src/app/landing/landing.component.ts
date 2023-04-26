import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

  fadein = false;

  constructor(private router : Router){}

  ngOnInit(): void {
    this.fadein = true;
  }

  goToLibrary(){
    this.router.navigateByUrl('Library');
  }

  createDeck(){}
}
