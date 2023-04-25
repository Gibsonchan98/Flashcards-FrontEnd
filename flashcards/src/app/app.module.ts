import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CollectionsComponent } from './collections/collections.component';
import { LandingComponent } from './landing/landing.component';
import { DeckComponent } from './deck/deck.component';
import { AboutComponent } from './about/about.component';
import { LoaderComponent } from './loader/loader.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CollectionsComponent,
    LandingComponent,
    DeckComponent,
    AboutComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
