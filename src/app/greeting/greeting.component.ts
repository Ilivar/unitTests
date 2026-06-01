import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-greeting',
  imports: [FormsModule],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.scss',
})
export class GreetingComponent {
  private greetingService = inject(GreetingService);

  name = '';
  result = '';
  isValid: boolean | null = null;

  onGreet(): void {
    this.result = this.greetingService.greet(this.name);
    this.isValid = this.greetingService.isValidName(this.name);
  }

  reset(): void {
    this.name = '';
    this.result = '';
    this.isValid = null;
  }
}
