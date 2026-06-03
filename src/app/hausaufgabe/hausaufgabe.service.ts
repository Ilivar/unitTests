import { Injectable } from '@angular/core';

// =============================================================================
// HausaufgabeService
//
// Dieser Service enthält 20 einfache Hilfsfunktionen aus den Bereichen
// Mathematik, Strings und Arrays sowie eine asynchrone Funktion.
//
// Deine Aufgabe: Die dazugehörige Spec-Datei enthält absichtlich falsche
// Erwartungen. Lies den Code hier, verstehe, was jede Funktion tut,
// und korrigiere die Tests – alle 20 Tests sollen danach grün sein!
// =============================================================================

@Injectable({ providedIn: 'root' })
export class HausaufgabeService {

  // ── Mathematik ──────────────────────────────────────────────────────────────

  /** Addiert zwei Zahlen. */
  add(a: number, b: number): number {
    return a + b;
  }

  /** Subtrahiert b von a. */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /** Multipliziert zwei Zahlen. */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Dividiert a durch b.
   * @throws Error wenn b gleich 0 ist.
   */
  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division durch null ist nicht erlaubt');
    return a / b;
  }

  /** Gibt true zurück, wenn n eine gerade Zahl ist. */
  isEven(n: number): boolean {
    return n % 2 === 0;
  }

  /**
   * Begrenzt value auf den Bereich [min, max].
   * Ist value kleiner als min, wird min zurückgegeben.
   * Ist value größer als max, wird max zurückgegeben.
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  // ── Strings ─────────────────────────────────────────────────────────────────

  /** Schreibt den ersten Buchstaben groß, den Rest klein. */
  capitalize(s: string): string {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  /** Kehrt die Zeichenfolge um. */
  reverseString(s: string): string {
    return s.split('').reverse().join('');
  }

  /** Gibt true zurück, wenn s ein Palindrom ist (Groß-/Kleinschreibung egal). */
  isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  /**
   * Kürzt s auf maxLength Zeichen und hängt '...' an,
   * falls s länger als maxLength ist.
   */
  truncate(s: string, maxLength: number): string {
    if (s.length <= maxLength) return s;
    return s.slice(0, maxLength) + '...';
  }

  /**
   * Wandelt einen camelCase-String in UPPER_SNAKE_CASE um.
   * Beispiel: 'helloWorld' → 'HELLO_WORLD'
   */
  toUpperSnakeCase(s: string): string {
    return s.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
  }

  // ── Arrays ──────────────────────────────────────────────────────────────────

  /** Gibt die größte Zahl im Array zurück. */
  getMax(arr: number[]): number {
    return Math.max(...arr);
  }

  /** Gibt die kleinste Zahl im Array zurück. */
  getMin(arr: number[]): number {
    return Math.min(...arr);
  }

  /** Gibt ein neues Array zurück, das nur die geraden Zahlen enthält. */
  filterEven(arr: number[]): number[] {
    return arr.filter(n => n % 2 === 0);
  }

  /** Summiert alle Zahlen im Array. */
  sumArray(arr: number[]): number {
    return arr.reduce((sum, n) => sum + n, 0);
  }

  /** Gibt ein neues Array ohne doppelte Einträge zurück. */
  removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  /** Zählt, wie oft value im Array vorkommt. */
  countOccurrences<T>(arr: T[], value: T): number {
    return arr.filter(item => item === value).length;
  }

  /** Flacht ein zweidimensionales Array um eine Ebene ab. */
  flattenArray<T>(arr: T[][]): T[] {
    return arr.flat();
  }

  /**
   * Gruppiert ein Array von Objekten anhand des angegebenen Schlüssels.
   * Beispiel: groupBy([{type:'a'},{type:'b'},{type:'a'}], 'type')
   *   → { a: [{type:'a'},{type:'a'}], b: [{type:'b'}] }
   */
  groupBy<T extends Record<string, unknown>>(
    arr: T[],
    key: string
  ): Record<string, T[]> {
    return arr.reduce((groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] ?? [];
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }

  // ── Async ───────────────────────────────────────────────────────────────────

  /**
   * Wartet ms Millisekunden und gibt dann die Nachricht zurück.
   * Gibt ein Promise zurück, das mit dem String aufgelöst wird.
   */
  delay(ms: number): Promise<string> {
    return new Promise(resolve =>
      setTimeout(() => resolve(`Fertig nach ${ms}ms`), ms)
    );
  }
}
