import { TestBed } from '@angular/core/testing';
import { HausaufgabeService } from './hausaufgabe.service';

// =============================================================================
// HausaufgabeService – Übungs-Tests
//
// ⚠️  ALLE TESTS IN DIESER DATEI SCHLAGEN ABSICHTLICH FEHL!
//
// Deine Aufgabe:
//   Lies den Code in hausaufgabe.service.ts, verstehe was jede Funktion tut,
//   und korrigiere den jeweils FALSCHEN erwarteten Wert in den expect()-Aufrufen.
//   Jeder Test hat einen Kommentar mit dem Hinweis ❌ AUFGABE.
//
// Abgedeckte Test-Muster (Jasmine / Angular Testing):
//   toBe · toEqual · toBeTruthy · toBeFalsy · toBeNull · toBeUndefined
//   toContain · toHaveSize · toMatch · toBeGreaterThan · toBeLessThan
//   toThrow · async/await mit resolves · spyOn · toHaveBeenCalled
//   toHaveBeenCalledWith · not-Modifier
// =============================================================================

describe('HausaufgabeService', () => {
  let service: HausaufgabeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HausaufgabeService);
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  // ── 1. add() ─────────────────────────────────────────────────────────────────
  // Muster: toBe  (primitiver Vergleich mit ===)

  describe('add()', () => {
    it('sollte 3 + 7 korrekt addieren', () => {
      // ❌ AUFGABE: Was ergibt 3 + 7 wirklich? Korrigiere den erwarteten Wert.
      expect(service.add(3, 7)).toBe(9);
    });

    it('sollte negative Zahlen addieren', () => {
      // ❌ AUFGABE: Was ergibt -4 + (-6)?
      expect(service.add(-4, -6)).toBe(-9);
    });
  });

  // ── 2. subtract() ────────────────────────────────────────────────────────────
  // Muster: toBe

  describe('subtract()', () => {
    it('sollte 15 minus 6 korrekt berechnen', () => {
      // ❌ AUFGABE: 15 - 6 ist nicht 8. Wie viel ist es wirklich?
      expect(service.subtract(15, 6)).toBe(8);
    });
  });

  // ── 3. multiply() ────────────────────────────────────────────────────────────
  // Muster: toBe

  describe('multiply()', () => {
    it('sollte 4 × 5 korrekt multiplizieren', () => {
      // ❌ AUFGABE: 4 × 5 ergibt nicht 25. Korrigiere den Wert.
      expect(service.multiply(4, 5)).toBe(25);
    });
  });

  // ── 4. divide() ──────────────────────────────────────────────────────────────
  // Muster: toBe und toThrow

  describe('divide()', () => {
    it('sollte 9 ÷ 3 korrekt berechnen', () => {
      // ❌ AUFGABE: 9 ÷ 3 ist nicht 4. Was ist das richtige Ergebnis?
      expect(service.divide(9, 3)).toBe(4);
    });

    it('sollte einen Fehler werfen, wenn durch null dividiert wird', () => {
      // ❌ AUFGABE: not.toThrow() prüft das Gegenteil – entferne das .not!
      expect(() => service.divide(5, 0)).not.toThrow();
    });
  });

  // ── 5. isEven() ──────────────────────────────────────────────────────────────
  // Muster: toBeTruthy / toBeFalsy

  describe('isEven()', () => {
    it('sollte true zurückgeben, wenn die Zahl gerade ist', () => {
      // ❌ AUFGABE: 6 ist gerade → isEven(6) gibt true zurück.
      //            toBeFalsy() erwartet einen falsy Wert. Welcher Matcher passt?
      expect(service.isEven(6)).toBeFalsy();
    });

    it('sollte false zurückgeben, wenn die Zahl ungerade ist', () => {
      // ❌ AUFGABE: 7 ist ungerade → isEven(7) gibt false zurück.
      //            toBeTruthy() erwartet einen truthy Wert. Welcher Matcher passt?
      expect(service.isEven(7)).toBeTruthy();
    });
  });

  // ── 6. clamp() ───────────────────────────────────────────────────────────────
  // Muster: toBe (Grenzwert-Tests)

  describe('clamp()', () => {
    it('sollte den Wert auf max begrenzen, wenn er zu groß ist', () => {
      // ❌ AUFGABE: clamp(15, 0, 10) → der Wert 15 überschreitet max=10.
      //            Was wird zurückgegeben? Nicht 15!
      expect(service.clamp(15, 0, 10)).toBe(15);
    });

    it('sollte den Wert auf min begrenzen, wenn er zu klein ist', () => {
      // ❌ AUFGABE: clamp(-5, 0, 10) → der Wert -5 unterschreitet min=0.
      //            Was wird zurückgegeben?
      expect(service.clamp(-5, 0, 10)).toBe(-5);
    });

    it('sollte den Wert unverändert lassen, wenn er im Bereich liegt', () => {
      // ❌ AUFGABE: clamp(5, 0, 10) → 5 liegt zwischen 0 und 10.
      //            Was wird zurückgegeben? Nicht 10!
      expect(service.clamp(5, 0, 10)).toBe(10);
    });
  });

  // ── 7. capitalize() ──────────────────────────────────────────────────────────
  // Muster: toBe (String-Vergleich)

  describe('capitalize()', () => {
    it('sollte den ersten Buchstaben groß schreiben', () => {
      // ❌ AUFGABE: capitalize('world') gibt nicht 'world' zurück.
      //            Schau dir die Funktion an und korrigiere den String.
      expect(service.capitalize('world')).toBe('world');
    });

    it('sollte den Rest kleinschreiben', () => {
      // ❌ AUFGABE: capitalize('hELLO') → der Rest wird klein geschrieben.
      //            Was ist das korrekte Ergebnis?
      expect(service.capitalize('hELLO')).toBe('HELLO');
    });

    it('sollte einen leeren String zurückgeben, wenn der Input leer ist', () => {
      // ❌ AUFGABE: capitalize('') → der Rückgabewert ist nicht undefined.
      //            Welcher Matcher prüft den tatsächlichen Rückgabewert?
      expect(service.capitalize('')).toBeUndefined();
    });
  });

  // ── 8. reverseString() ───────────────────────────────────────────────────────
  // Muster: toBe · toMatch (regulärer Ausdruck)

  describe('reverseString()', () => {
    it('sollte den String umkehren', () => {
      // ❌ AUFGABE: reverseString('abcde') ergibt nicht 'abcde'.
      //            Was ist die umgekehrte Reihenfolge?
      expect(service.reverseString('abcde')).toBe('abcde');
    });

    it('sollte mit dem Buchstaben "e" beginnen (Regex-Test)', () => {
      // ❌ AUFGABE: Der umgekehrte String 'abcde' beginnt nicht mit 'a'.
      //            Passe den regulären Ausdruck an den echten ersten Buchstaben an.
      expect(service.reverseString('abcde')).toMatch(/^a/);
    });
  });

  // ── 9. isPalindrome() ────────────────────────────────────────────────────────
  // Muster: toBeTruthy / toBeFalsy

  describe('isPalindrome()', () => {
    it('"racecar" ist ein Palindrom', () => {
      // ❌ AUFGABE: isPalindrome('racecar') gibt true zurück.
      //            toBeFalsy() erwartet einen falsy Wert – was ist richtig?
      expect(service.isPalindrome('racecar')).toBeFalsy();
    });

    it('"hello" ist kein Palindrom', () => {
      // ❌ AUFGABE: isPalindrome('hello') gibt false zurück.
      //            toBeTruthy() erwartet einen truthy Wert – was ist richtig?
      expect(service.isPalindrome('hello')).toBeTruthy();
    });
  });

  // ── 10. truncate() ───────────────────────────────────────────────────────────
  // Muster: toBe · toContain

  describe('truncate()', () => {
    it('sollte "..." anhängen, wenn der String zu lang ist', () => {
      // ❌ AUFGABE: truncate('JavaScript', 4) schneidet auf 4 Zeichen ab und
      //            hängt '...' an → das Ergebnis ist nicht 'Java'.
      expect(service.truncate('JavaScript', 4)).toBe('Java');
    });

    it('sollte "..." im Ergebnis enthalten, wenn gekürzt wurde', () => {
      // ❌ AUFGABE: toContain prüft, ob der Teilstring enthalten ist.
      //            '...' ist im Ergebnis enthalten – aber nicht '!!!'.
      expect(service.truncate('Hallo Welt', 5)).toContain('!!!');
    });

    it('sollte den String unverändert lassen, wenn er kürzer als maxLength ist', () => {
      // ❌ AUFGABE: truncate('Hi', 10) → der String ist kürzer als 10.
      //            Was wird zurückgegeben? Nicht null!
      expect(service.truncate('Hi', 10)).toBeNull();
    });
  });

  // ── 11. toUpperSnakeCase() ───────────────────────────────────────────────────
  // Muster: toBe · toMatch

  describe('toUpperSnakeCase()', () => {
    it('sollte camelCase in UPPER_SNAKE_CASE umwandeln', () => {
      // ❌ AUFGABE: 'helloWorld' wird nicht zu 'hello_world', sondern zu ...?
      //            Lies den Code der Funktion genau.
      expect(service.toUpperSnakeCase('helloWorld')).toBe('hello_world');
    });

    it('sollte nur Großbuchstaben enthalten (Regex)', () => {
      // ❌ AUFGABE: Der Regex /[a-z]/ prüft auf Kleinbuchstaben – das ist falsch.
      //            Das Ergebnis enthält nur Großbuchstaben und Unterstriche.
      //            Passe den Regex an: Großbuchstaben sind /^[A-Z_]+$/.
      expect(service.toUpperSnakeCase('fooBar')).toMatch(/[a-z]/);
    });
  });

  // ── 12. getMax() ─────────────────────────────────────────────────────────────
  // Muster: toBeGreaterThan / toBeLessThan

  describe('getMax()', () => {
    it('sollte die größte Zahl zurückgeben', () => {
      // ❌ AUFGABE: getMax([3, 1, 9, 5]) gibt 9 zurück.
      //            9 ist NICHT kleiner als 5 – ändere den Matcher oder den Wert.
      expect(service.getMax([3, 1, 9, 5])).toBeLessThan(5);
    });
  });

  // ── 13. getMin() ─────────────────────────────────────────────────────────────
  // Muster: toBeGreaterThan / toBeLessThan

  describe('getMin()', () => {
    it('sollte die kleinste Zahl zurückgeben', () => {
      // ❌ AUFGABE: getMin([3, 1, 9, 5]) gibt 1 zurück.
      //            1 ist NICHT größer als 3 – ändere den Matcher oder den Wert.
      expect(service.getMin([3, 1, 9, 5])).toBeGreaterThan(3);
    });
  });

  // ── 14. filterEven() ─────────────────────────────────────────────────────────
  // Muster: toEqual (Array-Vergleich, Reihenfolge + Inhalt)

  describe('filterEven()', () => {
    it('sollte nur gerade Zahlen zurückgeben', () => {
      // ❌ AUFGABE: filterEven([1,2,3,4,5,6]) gibt die GERADEN Zahlen zurück.
      //            [1,3,5] sind die UNGERADEN. Korrigiere das erwartete Array.
      expect(service.filterEven([1, 2, 3, 4, 5, 6])).toEqual([1, 3, 5]);
    });
  });

  // ── 15. sumArray() ───────────────────────────────────────────────────────────
  // Muster: toBe

  describe('sumArray()', () => {
    it('sollte alle Zahlen summieren', () => {
      // ❌ AUFGABE: 10 + 20 + 30 = ? Das Ergebnis ist nicht 50.
      expect(service.sumArray([10, 20, 30])).toBe(50);
    });
  });

  // ── 16. removeDuplicates() ───────────────────────────────────────────────────
  // Muster: toHaveSize (Länge eines Arrays)

  describe('removeDuplicates()', () => {
    it('sollte doppelte Einträge entfernen', () => {
      // ❌ AUFGABE: [1, 2, 2, 3, 3, 3] enthält 6 Elemente, aber nach dem
      //            Entfernen von Duplikaten bleiben nur 3 einzigartige übrig.
      //            Korrigiere die erwartete Größe.
      expect(service.removeDuplicates([1, 2, 2, 3, 3, 3])).toHaveLength(6);
    });

    it('sollte das korrekte deduplizierte Array zurückgeben', () => {
      // ❌ AUFGABE: Das Ergebnis enthält nicht das Element 99 – 99 ist gar nicht
      //            im Eingabe-Array. Korrigiere toContain auf einen echten Wert.
      expect(service.removeDuplicates([1, 2, 2, 3])).toContain(99);
    });
  });

  // ── 17. countOccurrences() ───────────────────────────────────────────────────
  // Muster: toBe

  describe('countOccurrences()', () => {
    it('sollte die Anzahl der Vorkommen zählen', () => {
      // ❌ AUFGABE: 'a' kommt in ['a','b','a','a'] dreimal vor, nicht einmal.
      expect(service.countOccurrences(['a', 'b', 'a', 'a'], 'a')).toBe(1);
    });
  });

  // ── 18. flattenArray() ───────────────────────────────────────────────────────
  // Muster: toEqual · toContain

  describe('flattenArray()', () => {
    it('sollte ein verschachteltes Array in ein flaches umwandeln', () => {
      // ❌ AUFGABE: Das Ergebnis ist [1,2,3,4], nicht [[1,2],[3,4]].
      //            toEqual vergleicht Struktur und Werte – ändere den erwarteten Wert.
      expect(service.flattenArray([[1, 2], [3, 4]])).toEqual([[1, 2], [3, 4]]);
    });

    it('sollte alle Elemente enthalten', () => {
      // ❌ AUFGABE: Die Zahl 5 ist nicht in [[1,2],[3,4]] enthalten.
      //            Welche Zahl ist wirklich im Ergebnis?
      expect(service.flattenArray([[1, 2], [3, 4]])).toContain(5);
    });
  });

  // ── 19. groupBy() ────────────────────────────────────────────────────────────
  // Muster: toEqual (Objekt-Vergleich)

  describe('groupBy()', () => {
    it('sollte Objekte nach dem Schlüssel gruppieren', () => {
      const input = [
        { type: 'frucht', name: 'Apfel' },
        { type: 'gemüse', name: 'Karotte' },
        { type: 'frucht', name: 'Banane' },
      ];
      // ❌ AUFGABE: Das erwartete Objekt ist falsch – die Gruppe 'frucht' hat
      //            2 Einträge, nicht 1. Und 'gemüse' hat 1 Eintrag, nicht 2.
      //            Passe das erwartete Objekt dem echten Ergebnis an.
      expect(service.groupBy(input, 'type')).toEqual({
        frucht: [{ type: 'frucht', name: 'Apfel' }],
        gemüse: [
          { type: 'gemüse', name: 'Karotte' },
          { type: 'gemüse', name: 'Banane' },
        ],
      });
    });
  });

  // ── 20. delay() ──────────────────────────────────────────────────────────────
  // Muster: async / await · resolves (Promise-Test)

  describe('delay()', () => {
    it('sollte nach 0 ms mit der richtigen Nachricht auflösen', async () => {
      // ❌ AUFGABE: Die Funktion löst mit 'Fertig nach 0ms' auf, nicht mit
      //            'Irgendwann fertig'. Korrigiere den erwarteten String.
      await expect(service.delay(0)).resolves.toBe('Irgendwann fertig');
    });

    it('die zurückgegebene Nachricht enthält die Wartezeit (Regex)', async () => {
      const result = await service.delay(0);
      // ❌ AUFGABE: Der Regex /^\d+ Sekunden/ passt nicht auf 'Fertig nach 0ms'.
      //            Schreibe einen Regex, der auf das echte Format passt.
      expect(result).toMatch(/^\d+ Sekunden/);
    });
  });

  // ── 21. spyOn – toHaveBeenCalled ─────────────────────────────────────────────
  // Muster: spyOn · toHaveBeenCalled · not-Modifier

  describe('spyOn / toHaveBeenCalled', () => {
    it('sollte registrieren, dass add() aufgerufen wurde', () => {
      // ❌ AUFGABE: Wir spionieren add() aus und rufen es auf.
      //            .not.toHaveBeenCalled() prüft das GEGENTEIL – entferne .not!
      const spy = vi.spyOn(service, 'add');
      service.add(1, 2);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  // ── 22. spyOn – toHaveBeenCalledWith ─────────────────────────────────────────
  // Muster: toHaveBeenCalledWith (prüft die exakten Argumente)

  describe('spyOn / toHaveBeenCalledWith', () => {
    it('sollte registrieren, mit welchen Argumenten multiply() aufgerufen wurde', () => {
      const spy = vi.spyOn(service, 'multiply');
      service.multiply(3, 7);
      // ❌ AUFGABE: multiply() wurde mit (3, 7) aufgerufen, nicht mit (9, 9).
      //            Korrigiere die erwarteten Argumente.
      expect(spy).toHaveBeenCalledWith(9, 9);
    });
  });
});
