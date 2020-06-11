import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  imageLoader = true;
  imageurl: any;


  @Input() score: string;
  @Output() playagain = new EventEmitter();
  @Output() Exit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.checkScore();
  }

  checkScore = () => {
    const finalScore = Number(this.score);

    if (finalScore === 0) {
      this.imageurl = '../../assets/score/scorezero.jpg';
    } else if (finalScore <= 20) {
      this.imageurl = '../../assets/score/score20.jpg';
    } else if (finalScore <= 40) {
      this.imageurl = '../../assets/score/score40.jpg';
    } else if (finalScore <= 50) {
      this.imageurl = '../../assets/score/score50.jpg';
    } else if (finalScore <= 70) {
      this.imageurl = '../../assets/score/score70.jpg';
    } else if (finalScore <= 90) {
      this.imageurl = '../../assets/score/score90.jpg';
    }
  }

  playAgain = () => {
    this.playagain.emit(true);
  }

  exit = () => {
    this.Exit.emit(true);
  }

}
