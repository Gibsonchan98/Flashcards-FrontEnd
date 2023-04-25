import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { CollectionsComponent } from './collections/collections.component';
import { DeckComponent } from './deck/deck.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: ' ', component: LandingComponent}, 
  { path: 'Library', component: CollectionsComponent}, 
  { path: 'Card', component: CardComponent}, 
  { path: 'Deck', component: DeckComponent}, 
  { path: 'About', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
