import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnChanges {


  @Input() currentQuestion: any;
  @Output() nextQuestion = new EventEmitter();
  @Output() repeatSong = new EventEmitter();


  isAudioPlaying: boolean;
  current = 0;
  intervalId: any;
  buttonDisabled = false;
  isOption1Loading = false;
  isOption2Loading = false;
  isOption3Loading = false;
  isOption4Loading = false;


  max = 20;
  stroke = 10;
  radius = 75;
  rounded = true;
  clockwise = true;
  color = '#fdc231';
  background = '#eaeaea';
  duration = 800;
  animation = 'easeOutCubic';
  animationDelay = 0;
  animations: string[] = [];
  gradient = false;


  constructor() {
    this.startProgress();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = changes.currentQuestion.firstChange;
    if (!isFirstChange) {
      this.current = 0;
      this.stopProgress();
      this.startProgress();
      this.buttonDisabled = false;
      this.clearLoadingButton();
    }
  }

  startProgress = () => {
    this.intervalId = setInterval(this.loadProgressBar, 1000);
  }

  stopProgress = () => {
    clearInterval(this.intervalId);
    // this.current = this.max;
    this.isAudioPlaying = false;
  }


  playAudio() {
    if (!this.isAudioPlaying) {
      this.repeatSong.emit('songrepeat');
      this.current = 0;
      this.stopProgress();
    }
  }

  loadProgressBar = () => {
    if (this.current < 20) {
      this.isAudioPlaying = true;
      this.current += 1;
    } else {
      this.current = this.max;
      this.stopProgress();
    }
  }

  checkAnswer = (answer: string, id: number) => {
    const buttonId = `isOption${id}Loading`;
    this.current = this.max;
    this.isAudioPlaying = false;
    this.buttonDisabled = true;
    this[buttonId] = true;
    this.nextQuestion.emit(answer);
  }

  clearLoadingButton = () => {
    this.isOption1Loading = false;
    this.isOption2Loading = false;
    this.isOption3Loading = false;
    this.isOption4Loading = false;
  }

  getOverlayStyle() {
    const isSemi = false;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }

}
