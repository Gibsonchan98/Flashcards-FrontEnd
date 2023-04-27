import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MaterialIcon } from 'material-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CollectionsComponent } from './collections/collections.component';
import { LandingComponent } from './landing/landing.component';
import { DeckComponent } from './deck/deck.component';
import { AboutComponent } from './about/about.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CollectionsComponent,
    LandingComponent,
    DeckComponent,
    AboutComponent,
    LoaderComponent,
    FooterComponent,
    CreateDeckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
    MatCardModule,
    ReactiveFormsModule, BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
