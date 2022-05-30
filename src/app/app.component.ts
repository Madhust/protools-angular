import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'I am stateless';
  counter = 0;
  changeTitle(): void {
    this.title = `Changed Title ${++this.counter}`;
  }
}
