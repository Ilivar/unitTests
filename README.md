# Angular Unit-Tests – Übungsprojekt

Dieses Projekt entstand mit dem [Angular CLI](https://github.com/angular/angular-cli) (v21.2.6) und zeigt Schritt für Schritt, wie man Angular-Anwendungen mit Unit-Tests absichert – von der ersten einfachen Prüfung bis hin zu Code-Coverage-Reports.

---

## Inhaltsverzeichnis

1. [Was sind Unit-Tests und warum schreibt man sie?](#1-was-sind-unit-tests-und-warum-schreibt-man-sie)
2. [Voraussetzungen & Installation](#2-voraussetzungen--installation)
3. [Projektstruktur und Lernpfad](#3-projektstruktur-und-lernpfad)
4. [Kernkonzepte](#4-kernkonzepte)
5. [Die Testdateien im Detail](#5-die-testdateien-im-detail)
6. [Hausaufgabe – Selbstständig üben](#6-hausaufgabe--selbstständig-üben)
7. [Mocking & Spying](#7-mocking--spying)
8. [Code Coverage](#8-code-coverage)
9. [Alle Befehle im Überblick](#9-alle-befehle-im-überblick)
10. [Weiterführende Links](#10-weiterführende-links)

---

## 1. Was sind Unit-Tests und warum schreibt man sie?

Ein **Unit-Test** prüft eine einzelne, abgeschlossene Einheit des Codes – z. B. eine Methode, einen Service oder eine Komponente – isoliert vom Rest der Anwendung.

**Warum lohnt sich der Aufwand?**

| Vorteil | Erklärung |
|---|---|
| Bugs früh finden | Fehler tauchen direkt nach dem Schreiben auf, nicht erst beim Testen im Browser |
| Sicher refaktorieren | Bestehende Tests schlagen an, wenn eine Änderung etwas kaputt macht |
| Lebende Dokumentation | Tests zeigen, wie eine Funktion sich verhalten soll |
| Schnelles Feedback | Ein Test-Durchlauf dauert Sekunden, ein manueller Test im Browser Minuten |

---

## 2. Voraussetzungen & Installation

```bash
# Node.js >= 22 und npm >= 11 werden benötigt
node -v
npm -v

# Projekt klonen und Abhängigkeiten installieren
npm install

# Anwendung im Browser starten (optional)
ng serve
# → http://localhost:4200
```

> **Hinweis:** Falls `node_modules` mit Root-Rechten angelegt wurde, einmalig ausführen:
> ```bash
> sudo chown -R $(whoami) node_modules package-lock.json ~/.npm
> npm install
> ```

---

## 3. Projektstruktur und Lernpfad

```
src/app/
├── app.ts / app.spec.ts              → Einstieg: Root-Komponente (3 Tests)
├── greeting/
│   ├── greeting.service.ts           → Einfacher Service mit zwei Methoden
│   ├── greeting.service.spec.ts      → Service isoliert testen (8 Tests)
│   ├── greeting.component.ts         → Komponente, die den Service injiziert
│   └── greeting.component.spec.ts   → Komponente + Spies (12 Tests)
├── contact-form/
│   ├── contact-form.ts               → Reactive Form mit Validierung
│   └── contact-form.spec.ts          → Formulare + DOM-Interaktion (24 Tests)
└── hausaufgabe/
    ├── hausaufgabe.service.ts        → 20 Hilfsfunktionen (Mathe, Strings, Arrays, Async)
    └── hausaufgabe.service.spec.ts   → Hausaufgabe: 38 absichtlich fehlerhafte Tests
```

**Empfohlene Reihenfolge:**

```
app.spec.ts  →  greeting.service.spec.ts  →  greeting.component.spec.ts  →  contact-form.spec.ts  →  hausaufgabe.service.spec.ts
   ↑                   ↑                           ↑                              ↑                             ↑
Einstieg          Services testen            Komponente + Spy             Formulare + DOM              Selbstständig üben
```

---

## 4. Kernkonzepte

### Das Test-Framework: Vitest

Angular nutzt seit Version 20+ standardmäßig [Vitest](https://vitest.dev/) als Test-Runner – eine moderne Alternative zu Karma/Jasmine. Vitest ist schneller, hat besseres TypeScript-Support und liefert klare Fehlermeldungen.

Der Runner wird über das Angular-Build-System gestartet:

```bash
ng test          # Vitest im Watch-Modus
ng test --watch=false   # Einmaliger Durchlauf
```

### TestBed – Angulars Testmodul

`TestBed` ist der Kern des Angular-Testing-Frameworks (`@angular/core/testing`). Es simuliert ein **Mini-Angular-Modul** für jeden Test:

```typescript
import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent],   // Standalone-Komponente importieren
  }).compileComponents();     // Template und Styles kompilieren
});
```

Über `TestBed.inject()` kann man Services aus dem Dependency-Injection-System holen – genau wie Angular es intern tut:

```typescript
const service = TestBed.inject(GreetingService);
```

### ComponentFixture – das Test-Wrapper-Objekt

`ComponentFixture` umschließt eine Komponente und gibt Zugriff auf Template und Instanz:

```typescript
const fixture = TestBed.createComponent(MyComponent);
const component = fixture.componentInstance;   // TypeScript-Klasse
const dom = fixture.nativeElement;             // echtes DOM-Element
```

Wichtige Methoden:

| Methode | Was sie tut |
|---|---|
| `fixture.detectChanges()` | Löst Change Detection aus – aktualisiert das Template |
| `await fixture.whenStable()` | Wartet, bis alle asynchronen Operationen abgeschlossen sind |
| `fixture.nativeElement` | Zugriff auf das DOM (`.querySelector()`, `.textContent` etc.) |

### describe / it / beforeEach

Tests werden mit diesen drei Funktionen strukturiert:

```typescript
describe('GreetingService', () => {       // Gruppe von Tests
  let service: GreetingService;

  beforeEach(() => {                      // läuft vor JEDEM it()-Block
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingService);
  });

  it('sollte "Hallo, Anna!" zurückgeben', () => {   // einzelner Test
    expect(service.greet('Anna')).toBe('Hallo, Anna!');
  });
});
```

> `beforeEach` sorgt dafür, dass jeder Test mit einer **frischen Instanz** startet – Tests sind so voneinander unabhängig.

### Matcher – was kann `expect()` prüfen?

Vitest liefert viele eingebaute Matcher:

```typescript
expect(value).toBe('exakt gleich')          // strenger Vergleich (===)
expect(value).toEqual({ a: 1 })             // tiefes Objekt-Vergleich
expect(value).toBeTruthy()                  // nicht null/undefined/false/0
expect(value).toBeNull()
expect(value).toBe(true) / toBe(false)
expect(value).toContain('Teilstring')
expect(ctrl.hasError('required')).toBe(true) // Reactive Forms
expect(spy).toHaveBeenCalledWith('arg')      // Spy-Aufruf prüfen
```

---

## 5. Die Testdateien im Detail

### `app.spec.ts` – Einstieg (3 Tests)

Der einfachste Einstiegspunkt. Zeigt:
- Wie man eine Standalone-Komponente mit `TestBed` aufbaut
- Wie man Property-Werte prüft
- Wie man Text im DOM prüft

```typescript
it('sollte den Titel im Template anzeigen', async () => {
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  const h1 = fixture.nativeElement.querySelector('h1');
  expect(h1?.textContent).toContain('Unit-Tests Demo');
});
```

---

### `greeting.service.spec.ts` – Service isoliert testen (8 Tests)

Services enthalten die Geschäftslogik – sie haben kein Template und keine DOM-Abhängigkeit. Deshalb sind sie besonders einfach zu testen.

```typescript
describe('greet()', () => {
  it('sollte den Namen in der Grußformel verwenden', () => {
    expect(service.greet('Anna')).toBe('Hallo, Anna!');
  });

  it('sollte einen Fallback liefern, wenn der Name leer ist', () => {
    expect(service.greet('')).toBe('Hallo, Unbekannter!');
  });
});
```

**Was man hier lernt:** Reine Funktionslogik mit verschiedenen Eingaben (Normalfall, Leerstring, Whitespace) testen – das Herzstück des Unit-Testens.

---

### `greeting.component.spec.ts` – Komponente + Spies (12 Tests)

Zeigt, wie man eine Komponente testet, die einen Service injiziert. Enthält zwei Ansätze:

**Ansatz 1 – Integration:** Der echte Service wird verwendet (TestBed stellt ihn bereit). Gut für End-to-End-Verhalten innerhalb einer Einheit.

**Ansatz 2 – Spy (isoliert):** Die Service-Methoden werden durch kontrollierte Attrappen ersetzt. Gut um zu prüfen, *ob* und *womit* die Komponente den Service aufruft.

```typescript
it('sollte den Fallback-Gruß liefern bei leerem Namen', () => {
  component.name = '';
  component.onGreet();
  expect(component.result).toBe('Hallo, Unbekannter!');
});
```

---

### `contact-form.spec.ts` – Reactive Forms + DOM (24 Tests)

Das umfangreichste Beispiel. Zeigt:
- Controls und Validatoren eines `FormGroup` prüfen
- `onSubmit()` bei gültigem vs. ungültigem Formular
- DOM-Interaktion: Button-Zustand, Template-Conditionals, `dispatchEvent()`

```typescript
it('sollte einen Wert per dispatchEvent ins FormControl übertragen', async () => {
  const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="name"]');
  nameInput.value = 'Max Mustermann';
  nameInput.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  await fixture.whenStable();

  expect(component.form.get('name')?.value).toBe('Max Mustermann');
});

it('sollte die Erfolgsmeldung anzeigen, nachdem das Formular abgeschickt wurde', async () => {
  component.form.setValue({ name: 'Max', email: 'max@test.de', message: 'Genug Zeichen hier.' });
  component.onSubmit();
  fixture.detectChanges();
  await fixture.whenStable();

  expect(fixture.nativeElement.querySelector('.success')).toBeTruthy();
});
```

---

## 6. Hausaufgabe – Selbstständig üben

### `hausaufgabe.service.spec.ts` – Alle Matcher in der Praxis (38 Tests)

Diese Datei ist **keine Demonstration, sondern eine Übung**: Alle 38 Tests schlagen absichtlich fehl. Die Aufgabe besteht darin, den `HausaufgabeService` in `hausaufgabe.service.ts` zu lesen und die jeweils falsch gesetzten Erwartungen in den `expect()`-Aufrufen zu korrigieren, bis alle Tests grün sind.

**Abgedeckte Bereiche:**

| Bereich | Funktionen |
|---|---|
| Mathematik | `add`, `subtract`, `multiply`, `divide`, `isEven`, `clamp` |
| Strings | `capitalize`, `reverseString`, `isPalindrome`, `truncate`, `toUpperSnakeCase` |
| Arrays | `getMax`, `getMin`, `filterEven`, `sumArray`, `removeDuplicates`, `countOccurrences`, `flattenArray`, `groupBy` |
| Async | `delay` (Promise mit `async/await` und `resolves`) |
| Spies | `vi.spyOn` mit `toHaveBeenCalled` und `toHaveBeenCalledWith` |

**Abgedeckte Matcher:**

```typescript
toBe · toEqual · toBeTruthy · toBeFalsy · toBeNull · toBeUndefined
toContain · toHaveLength · toMatch · toBeGreaterThan · toBeLessThan
toThrow · resolves · toHaveBeenCalled · toHaveBeenCalledWith · not-Modifier
```

**Vorgehen:**

1. Tests ausführen: `ng test` – alle Hausaufgaben-Tests sind rot
2. `hausaufgabe.service.ts` lesen und die Funktion verstehen
3. Den Kommentar `❌ AUFGABE` im Test lesen – er erklärt, was falsch ist
4. Den falschen Wert im `expect()` korrigieren
5. Test wird grün – weiter zum nächsten

> **Hinweis:** Die Lösungsdatei ist aus dem Repository ausgeschlossen (`.gitignore`).
> Versuche die Aufgaben selbstständig zu lösen, bevor du nachschaust!

---

## 7. Mocking & Spying

Ein **Spy** ist eine Attrappe, die eine echte Methode zur Laufzeit ersetzt – kontrollierbar im Rückgabewert und überprüfbar, ob und womit sie aufgerufen wurde.

Vitest stellt dafür `vi.spyOn()` bereit (global verfügbar, kein Import nötig):

```typescript
const service = TestBed.inject(GreetingService);

// 1. Spy anlegen und Rückgabewert festlegen
const greetSpy = vi.spyOn(service, 'greet').mockReturnValue('Mock-Gruß!');

// 2. Aktion auslösen
component.name = 'Test';
component.onGreet();

// 3. Prüfen, ob die Methode mit dem richtigen Argument aufgerufen wurde
expect(greetSpy).toHaveBeenCalledWith('Test');

// 4. Prüfen, ob die Komponente den Mock-Wert übernommen hat
expect(component.result).toBe('Mock-Gruß!');
```

> **Warum Spies?** Sie entkoppeln den Test vom Service. Wenn der Service einen Bug hat, schlägt nur der Service-Test an – nicht auch noch der Komponenten-Test.

Das vollständige Beispiel befindet sich in [greeting.component.spec.ts](src/app/greeting/greeting.component.spec.ts) im Abschnitt *Mocking & Spying mit vi.spyOn()*.

---

## 8. Code Coverage

Code Coverage misst, **wie viel Prozent des Quellcodes** durch Tests ausgeführt wird. Das Coverage-Paket `@vitest/coverage-v8` ist bereits installiert und konfiguriert – es nutzt Node.js' nativen V8-Coverage-Mechanismus.

### Coverage ausführen

```bash
npm run test:coverage
```

oder gleichwertig:

```bash
ng test --coverage --watch=false
```

Die Terminal-Ausgabe sieht ungefähr so aus:

```
 % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
---------|----------|---------|---------|------------------
  100.00 |   100.00 |  100.00 |  100.00 |
```

### HTML-Report öffnen

```bash
open coverage/unitTests/lcov-report/index.html
```

Der interaktive Report zeigt **jede Zeile** farblich markiert: grün = getestet, rot = nicht getestet. So sieht man auf einen Blick, welche Pfade noch fehlen.

### Konfigurierte Reporter

| Reporter | Ausgabe | Einsatzort |
|---|---|---|
| `text` | Tabelle im Terminal | Lokale Entwicklung |
| `text-summary` | Kompakte Zusammenfassung | CI-Logs |
| `html` | Interaktiver Browser-Report | Analyse |
| `lcov` | Maschinenlesbar | CI-Tools, SonarQube |

### Coverage-Thresholds

In `angular.json` sind Mindestgrenzen hinterlegt. Unterschreitet die Coverage diesen Wert, **schlägt der Build fehl** – ein wichtiges Sicherheitsnetz im CI:

| Metrik | Bedeutung | Minimum |
|---|---|---|
| Statements | Einzelne Anweisungen | 80 % |
| Branches | if/else-Zweige | 80 % |
| Functions | Aufgerufene Funktionen | 80 % |
| Lines | Ausgeführte Zeilen | 80 % |

Aktueller Stand: **100 % auf allen Metriken.**

### Ausgeschlossene Dateien

Reine Konfigurationsdateien ohne testbare Logik sind vom Report ausgenommen:

```
*.spec.ts      → die Tests selbst
main.ts        → Bootstrap-Code
app.config.ts  → App-Konfiguration
app.routes.ts  → Routing-Konfiguration
```

### Coverage einrichten (Referenz)

Das Paket ist bereits installiert. Zur Information: So wurde es eingerichtet:

```bash
npm install --save-dev @vitest/coverage-v8
```

In `angular.json` unter `projects → unitTests → architect → test → options`:

```json
"coverage": true,
"coverageReporters": ["text", "text-summary", "html", "lcov"],
"coverageExclude": ["src/**/*.spec.ts", "src/main.ts", ...],
"coverageThresholds": {
  "statements": 80,
  "branches": 80,
  "functions": 80,
  "lines": 80
}
```

---

## 9. Alle Befehle im Überblick

```bash
# Tests im Watch-Modus (re-runs bei Dateiänderung)
ng test

# Tests einmalig ausführen
ng test --watch=false

# Tests mit Coverage-Report
npm run test:coverage

# HTML-Coverage-Report öffnen
open coverage/unitTests/lcov-report/index.html

# Anwendung im Browser starten
ng serve

# Build
ng build

# Neue Komponente generieren (inkl. Spec-Datei)
ng generate component components/mein-feature
```

---

## 10. Weiterführende Links

### Angular

- [Angular Testing Guide](https://angular.dev/guide/testing) – offizielle Dokumentation
- [TestBed API](https://angular.dev/api/core/testing/TestBed)
- [ComponentFixture API](https://angular.dev/api/core/testing/ComponentFixture)
- [Angular CLI Referenz](https://angular.dev/tools/cli)

### Vitest

- [Vitest Dokumentation](https://vitest.dev/)
- [Vitest Expect API (alle Matcher)](https://vitest.dev/api/expect.html)
- [vi.spyOn() Dokumentation](https://vitest.dev/api/vi.html#vi-spyon)
- [Coverage mit @vitest/coverage-v8](https://vitest.dev/guide/coverage.html)
