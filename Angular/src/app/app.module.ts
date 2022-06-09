import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardComponent } from './custom/card/card.component';
import { CardTitleComponent } from './custom/card-title/card-title.component';
import { CardSubtitleComponent } from './custom/card-subtitle/card-subtitle.component';
import { CardBodyComponent } from './custom/card-body/card-body.component';
import { CardFooterComponent } from './custom/card-footer/card-footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';

const routes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '/home'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    AboutComponent,
    CardComponent,
    CardTitleComponent,
    CardSubtitleComponent,
    CardBodyComponent,
    CardFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
