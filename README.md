# Protools Angular Package

`@protools/angular` contains items that provides additional capabilities to your angular application.

## Stateless component decorator

Stateless component is a hot topic in React and when comes with Angular, all components are statefull by default. You can make your Angular component stateless by preventing it from updating the incoming properties.

`StatelessComponent` decorator helps you to ensure one and only main rule that make your Angular component stateless.

> "DON'T MUTATE ANY INCOMING PROPERTIES WITHIN THE COMPONENT".

`StatelessComponent` decorator ensures stateless of your angular component by simply ensuring below two things.

* Prevent mutating any property marked with `@Input`.
* Throws exception when `@Input` property is mutated inside the component.

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {StatelessComponent} from '@protools/angular';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
@StatelessComponent()
export class StateComponent {

  @Input()
  public title = '';

  counter = 1;

  constructor() { }

  changeTitle(): void {
    this.title = `Changed Title from child ${++this.counter}`;
  }

}
```

In the `changeTitle` method, the `title` input property is changed but `StatelessComponent` prevent it from doing so by throwing exception/waring.

### Options

`StatelessComponent` decorator accepts below options which provides control over handling statelessness of your component.

| Option | Usage |
| --- | ----------- |
| `excludedMethods: string[]` | `StatelessComponent` decorator will disallow modification of input property in any methods other than `constructor` & `ngOnInit`. If you want to exclude any other methods, then it has to be added in this property. |
| `debug: boolean` | By default, its true. Disabling this option, will throw  console warning when stateless rules are overruled. |








