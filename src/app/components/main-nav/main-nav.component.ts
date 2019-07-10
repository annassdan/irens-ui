import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  background = [true, false, false, false, false];
  constructor() { }

  ngOnInit() {
  }

  getMyStyles() {
    const myStyles = {
      'background': this.background[0] || this.background[1] || this.background[2] || this.background[3] || this.background[4] ? 'gainsboro' : '',
      'color': this.background[0] || this.background[1] || this.background[2] || this.background[3] || this.background[4] ? 'black' : 'white,'
    };
    return myStyles;
  }

  button_active(number) {
    this.background = [false, false, false, false, false];
    if(number >= 0) {
      this.background[number] = true;
    }
  }

  noAction() {
    return undefined;
  }
}
