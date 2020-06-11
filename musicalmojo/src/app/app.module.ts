import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CategoriesComponent } from './categories/categories.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { QuestionsComponent } from './questions/questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountUpModule } from 'ngx-countup';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    CategoriesComponent,
    QuestionsComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CountUpModule,
    RoundProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
