import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form';
import { GreetingComponent } from './greeting/greeting.component';

@Component({
  selector: 'app-root',
  imports: [ContactFormComponent, GreetingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = 'Unit-Tests Demo';
}
