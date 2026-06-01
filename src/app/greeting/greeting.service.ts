import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GreetingService {
  greet(name: string): string {
    if (!name.trim()) {
      return 'Hallo, Unbekannter!';
    }
    return `Hallo, ${name}!`;
  }

  isValidName(name: string): boolean {
    return name.trim().length >= 2;
  }
}
