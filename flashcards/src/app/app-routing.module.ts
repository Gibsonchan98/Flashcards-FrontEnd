import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { CollectionsComponent } from './collections/collections.component';
import { DeckComponent } from './deck/deck.component';
import { LandingComponent } from './landing/landing.component';
import { LoaderComponent } from './loader/loader.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';

const routes: Routes = [
  { path: '', component: LoaderComponent},
  { path: 'Landing', component: LandingComponent}, 
  { path: 'Library', component: CollectionsComponent}, 
  { path: 'Card', component: CardComponent}, 
  { path: 'Deck/:category', component: DeckComponent}, 
  { path: 'About', component: AboutComponent},
  { path: 'Create', component: CreateDeckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
