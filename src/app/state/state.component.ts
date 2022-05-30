import { Component, Input, Output, EventEmitter } from '@angular/core';
import {StatelessComponent} from '@protools/angular';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
@StatelessComponent({
  debug: false
})
export class StateComponent {

  @Input()
  public title = '';
  counter = 1;
  constructor() { }

  changeTitle(): void {
    this.title = `Changed Title from child ${++this.counter}`;
  }

}
