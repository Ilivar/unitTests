import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreetingComponent } from './greeting.component';
import { GreetingService } from './greeting.service';

// ─────────────────────────────────────────────────────────────────────────────
// GreetingComponent – Unit-Tests
//
// Themen, die hier veranschaulicht werden:
//  • Komponente mit TestBed aufsetzen (compileComponents, createComponent)
//  • ComponentFixture: fixture.detectChanges(), fixture.whenStable()
//  • Initialzustand einer Komponente prüfen
//  • Methoden der Komponente direkt aufrufen und Ergebnis prüfen
//  • Integration mit dem echten Service (TestBed.inject)
//  • Spies mit vi.spyOn() – Abhängigkeiten isolieren und Aufrufe verifizieren
// ─────────────────────────────────────────────────────────────────────────────

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  // ── Initialzustand ──────────────────────────────────────────────────────────

  describe('Initialzustand', () => {
    it('sollte mit leerem name starten', () => {
      expect(component.name).toBe('');
    });

    it('sollte mit leerem result starten', () => {
      expect(component.result).toBe('');
    });

    it('sollte isValid initial auf null setzen', () => {
      expect(component.isValid).toBeNull();
    });
  });

  // ── onGreet() ───────────────────────────────────────────────────────────────

  describe('onGreet()', () => {
    it('sollte result über den GreetingService befüllen', () => {
      component.name = 'Anna';
      component.onGreet();
      expect(component.result).toBe('Hallo, Anna!');
    });

    it('sollte isValid auf true setzen bei gültigem Namen', () => {
      component.name = 'Anna';
      component.onGreet();
      expect(component.isValid).toBe(true);
    });

    it('sollte isValid auf false setzen bei ungültigem Namen', () => {
      component.name = 'A';
      component.onGreet();
      expect(component.isValid).toBe(false);
    });

    it('sollte den Fallback-Gruß liefern bei leerem Namen', () => {
      component.name = '';
      component.onGreet();
      expect(component.result).toBe('Hallo, Unbekannter!');
    });
  });

  // ── reset() ─────────────────────────────────────────────────────────────────

  describe('reset()', () => {
    it('sollte name, result und isValid zurücksetzen', () => {
      component.name = 'Anna';
      component.onGreet();

      component.reset();

      expect(component.name).toBe('');
      expect(component.result).toBe('');
      expect(component.isValid).toBeNull();
    });
  });

  // ── Integration mit GreetingService ─────────────────────────────────────────
  // Zeigt, wie man mit TestBed.inject() prüft, dass die Komponente
  // tatsächlich den injizierten Service verwendet.

  describe('Integration mit GreetingService', () => {
    it('sollte denselben Service verwenden, den TestBed bereitstellt', () => {
      const service = TestBed.inject(GreetingService);
      component.name = 'Max';
      component.onGreet();
      expect(component.result).toBe(service.greet('Max'));
    });
  });

  // ── Mocking & Spying mit vi.spyOn() ─────────────────────────────────────────
  // Ein Spy ersetzt eine Methode zur Laufzeit durch eine kontrollierte Attrappe.
  // So testet man die Komponente ISOLIERT vom echten Service:
  //  1. Rückgabewert festlegen  →  mockReturnValue()
  //  2. Prüfen, ob die Methode aufgerufen wurde  →  toHaveBeenCalledWith()
  // Nach dem Test stellt Vitest den Original-Code automatisch wieder her.

  describe('Mocking & Spying mit vi.spyOn()', () => {
    it('sollte greet() des GreetingService mit dem eingegebenen Namen aufrufen', () => {
      const service = TestBed.inject(GreetingService);
      const greetSpy = vi.spyOn(service, 'greet').mockReturnValue('Mock-Gruß!');

      component.name = 'Test';
      component.onGreet();

      expect(greetSpy).toHaveBeenCalledWith('Test');
      expect(component.result).toBe('Mock-Gruß!');
    });

    it('sollte isValidName() des GreetingService aufrufen und das Ergebnis übernehmen', () => {
      const service = TestBed.inject(GreetingService);
      const validSpy = vi.spyOn(service, 'isValidName').mockReturnValue(false);

      component.name = 'Anna'; // würde ohne Spy true liefern
      component.onGreet();

      expect(validSpy).toHaveBeenCalledWith('Anna');
      expect(component.isValid).toBe(false); // Spy-Wert schlägt durch
    });
  });
});
