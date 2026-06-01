import { TestBed } from '@angular/core/testing';
import { GreetingService } from './greeting.service';

// ─────────────────────────────────────────────────────────────────────────────
// GreetingService – Unit-Tests
//
// Services ohne DOM-Abhängigkeit können mit TestBed.inject() sehr einfach
// instanziiert und isoliert getestet werden.
// ─────────────────────────────────────────────────────────────────────────────

describe('GreetingService', () => {
  let service: GreetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreetingService);
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  // ── greet() ─────────────────────────────────────────────────────────────────

  describe('greet()', () => {
    it('sollte den übergebenen Namen in der Grußformel verwenden', () => {
      expect(service.greet('Anna')).toBe('Hallo, Anna!');
    });

    it('sollte einen Fallback zurückgeben, wenn der Name leer ist', () => {
      expect(service.greet('')).toBe('Hallo, Unbekannter!');
    });

    it('sollte einen Fallback zurückgeben, wenn der Name nur Leerzeichen enthält', () => {
      expect(service.greet('   ')).toBe('Hallo, Unbekannter!');
    });
  });

  // ── isValidName() ────────────────────────────────────────────────────────────

  describe('isValidName()', () => {
    it('sollte true zurückgeben bei 2 oder mehr Zeichen', () => {
      expect(service.isValidName('Li')).toBe(true);
      expect(service.isValidName('Max')).toBe(true);
    });

    it('sollte false zurückgeben bei einem einzigen Zeichen', () => {
      expect(service.isValidName('A')).toBe(false);
    });

    it('sollte false zurückgeben bei leerem String', () => {
      expect(service.isValidName('')).toBe(false);
    });

    it('sollte führende/nachfolgende Leerzeichen ignorieren', () => {
      expect(service.isValidName('  A  ')).toBe(false);
      expect(service.isValidName('  Li ')).toBe(true);
    });
  });
});
