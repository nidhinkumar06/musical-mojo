import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  imageLoader = true;
  constructor() {}

  @Input() categories: any[];
  @Output() selectedMusic = new EventEmitter();

  ngOnInit(): void {}


  musicSelect = (music: string) => {
    this.selectedMusic.emit(music);
  }

}
