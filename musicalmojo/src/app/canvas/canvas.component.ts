import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';


import { PausableObservable, pausable } from 'rxjs-pausable';
import { interval } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  interactiveCanvas: any;
  callbacks: any = {};
  imageLoader = true;
  showSplashScreen = true;
  showQuestions = false;
  showScore = false;
  categories: any;
  existingUser: boolean;
  selectedMusicCategory: string;


  questions = [];
  currentQuestion: any = {};
  score = 0;

  paused = true;
  pausable: PausableObservable<number>;

  constructor(private zone: NgZone) {
    this.interactiveCanvas = (window as any).interactiveCanvas;

    this.callbacks.onUpdate = (data: any) => {
      this.categories = data.categories;
      this.existingUser = data.isExistingUser;
      this.callbacks.html_data = data;
      switch (data.scene) {
        case 'WELCOME':
          console.log('welcome got called');
          break;

        case 'SHOW_QUESTION':
          this.selectedMusicCategory = data.musicCategory;
          this.currentQuestion = data.questions;
          this.questionsScene();
          break;

        case 'SHOW_SCORE':
          this.score = data.score;
          this.scoreScene();
          break;
      }
    };
  }

  ngOnInit(): void {
    this.initializeScenes();
  }

  initializeScenes = () => {
    this.interactiveCanvas.getHeaderHeightPx().then((height: any) => {
      $(document.body).css('margin-top', `${height}px`);
      setTimeout(() => {
        this.showSplashScreen = false;
        $(document.body).css('background-color', `#553d7c`);
      }, 16000);
      this.interactiveCanvas.ready(this.callbacks);
    });
  }

  musicSelect = (music: string) => {
    this.selectedMusicCategory = music;
    this.interactiveCanvas.sendTextQuery(music);
  }

  questionsScene = () => {
    // needed zone because onclick of button it goes from html to cloudfunctions which loses focus in angular
    this.zone.run(() => {
      $(document.body).css('background-color', `#553d7c`);
      this.pausable && this.pausable.pause();
      this.showScore = false;
      this.showQuestions = true;
    });
  }

  nextQuestion = (answer: string) => {
    this.interactiveCanvas.sendTextQuery(answer);
  }

  scoreScene = () => {
    this.zone.run(() => {
      this.showScore = true;
      this.showConfetti();
      $(document.body).css('background-color', 'white');
    });
  }

  showConfetti = () => {
    this.pausable = interval(800)
    .pipe(pausable()) as PausableObservable<number>;
    this.pausable.subscribe(this.shoot.bind(this));
  }

  playAgain = (play: boolean) => {
    this.interactiveCanvas.sendTextQuery('playagain');
  }

  exit = (exit: boolean) => {
    this.interactiveCanvas.sendTextQuery('exitgame');
  }

  repeatSong = (song: string) => {
    this.interactiveCanvas.sendTextQuery('repeat song');
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 50),
        origin: {
            y: 0.6
        }
      });
    } catch (e) {
      // noop, confettijs may not be loaded yet
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }

}
