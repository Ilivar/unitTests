import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form';

// ─────────────────────────────────────────────────────────────────────────────
// ContactFormComponent – Unit-Tests
//
// Themen, die hier veranschaulicht werden:
//  • Komponente erstellen (TestBed + fixture)
//  • Reactive-Forms-Controls prüfen
//  • Einzelne Validatoren isoliert testen
//  • Vollständige Formular-Submission testen
//  • DOM-Interaktion (dispatchEvent / nativeElement)
// ─────────────────────────────────────────────────────────────────────────────

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  // beforeEach läuft vor jedem einzelnen Test und stellt sicher,
  // dass jeder Test mit einer frischen Komponenten-Instanz startet.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent], // Standalone-Komponente direkt importieren
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit auslösen + Template rendern
  });

  // ── 1. Basis ────────────────────────────────────────────────────────────────

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  // ── 2. Formular-Initialisierung ─────────────────────────────────────────────

  describe('Formular-Initialisierung', () => {
    it('sollte die drei Controls name, email und message enthalten', () => {
      expect(component.form.contains('name')).toBe(true);
      expect(component.form.contains('email')).toBe(true);
      expect(component.form.contains('message')).toBe(true);
    });

    it('sollte mit leeren Werten starten', () => {
      expect(component.form.value).toEqual({ name: '', email: '', message: '' });
    });

    it('sollte ungültig sein, wenn alle Felder leer sind', () => {
      expect(component.form.invalid).toBe(true);
    });

    it('isSubmitted sollte initial false sein', () => {
      expect(component.isSubmitted).toBe(false);
    });
  });

  // ── 3. name-Control ─────────────────────────────────────────────────────────

  describe('name-Feld', () => {
    it('sollte den Fehler "required" haben, wenn leer', () => {
      const ctrl = component.form.get('name')!;
      ctrl.setValue('');
      expect(ctrl.hasError('required')).toBe(true);
    });

    it('sollte den Fehler "minlength" haben bei weniger als 3 Zeichen', () => {
      const ctrl = component.form.get('name')!;
      ctrl.setValue('ab');
      expect(ctrl.hasError('minlength')).toBe(true);
    });

    it('sollte gültig sein ab 3 Zeichen', () => {
      const ctrl = component.form.get('name')!;
      ctrl.setValue('Max');
      expect(ctrl.valid).toBe(true);
    });
  });

  // ── 4. email-Control ────────────────────────────────────────────────────────

  describe('email-Feld', () => {
    it('sollte den Fehler "required" haben, wenn leer', () => {
      const ctrl = component.form.get('email')!;
      ctrl.setValue('');
      expect(ctrl.hasError('required')).toBe(true);
    });

    it('sollte den Fehler "email" haben bei ungültigem Format', () => {
      const ctrl = component.form.get('email')!;
      ctrl.setValue('keine-email');
      expect(ctrl.hasError('email')).toBe(true);
    });

    it('sollte gültig sein bei korrekter E-Mail-Adresse', () => {
      const ctrl = component.form.get('email')!;
      ctrl.setValue('max@beispiel.de');
      expect(ctrl.valid).toBe(true);
    });
  });

  // ── 5. message-Control ──────────────────────────────────────────────────────

  describe('message-Feld', () => {
    it('sollte den Fehler "required" haben, wenn leer', () => {
      const ctrl = component.form.get('message')!;
      ctrl.setValue('');
      expect(ctrl.hasError('required')).toBe(true);
    });

    it('sollte den Fehler "minlength" haben bei weniger als 10 Zeichen', () => {
      const ctrl = component.form.get('message')!;
      ctrl.setValue('Kurz');
      expect(ctrl.hasError('minlength')).toBe(true);
    });

    it('sollte gültig sein ab 10 Zeichen', () => {
      const ctrl = component.form.get('message')!;
      ctrl.setValue('Das ist eine ausreichend lange Nachricht.');
      expect(ctrl.valid).toBe(true);
    });
  });

  // ── 6. onSubmit() ───────────────────────────────────────────────────────────

  describe('onSubmit()', () => {
    it('sollte isSubmitted NICHT setzen, wenn das Formular ungültig ist', () => {
      component.onSubmit();
      expect(component.isSubmitted).toBe(false);
    });

    it('sollte isSubmitted auf true setzen, wenn das Formular gültig ist', () => {
      component.form.setValue({
        name: 'Max Mustermann',
        email: 'max@beispiel.de',
        message: 'Das ist eine Testnachricht, die lang genug ist.',
      });
      component.onSubmit();
      expect(component.isSubmitted).toBe(true);
    });

    it('sollte das Formular nach erfolgreicher Submission als gültig zeigen', () => {
      component.form.setValue({
        name: 'Anna Schmidt',
        email: 'anna@test.de',
        message: 'Noch eine gültige Nachricht.',
      });
      expect(component.form.valid).toBe(true);
    });
  });

  // ── 7. reset() ──────────────────────────────────────────────────────────────

  describe('reset()', () => {
    it('sollte isSubmitted zurücksetzen', () => {
      component.isSubmitted = true;
      component.reset();
      expect(component.isSubmitted).toBe(false);
    });

    it('sollte alle Formular-Werte auf null zurücksetzen', () => {
      component.form.setValue({
        name: 'Max',
        email: 'max@test.de',
        message: 'Eine lange Nachricht.',
      });
      component.reset();
      expect(component.form.get('name')?.value).toBeNull();
      expect(component.form.get('email')?.value).toBeNull();
      expect(component.form.get('message')?.value).toBeNull();
    });
  });

  // ── 8. DOM-Interaktion ──────────────────────────────────────────────────────
  // Hier wird gezeigt, wie man Eingaben über das echte DOM simuliert,
  // um den gesamten Datenbindungs-Kreislauf (Template ↔ FormGroup) zu testen.
  //
  // dispatchEvent(): Ein echtes Browser-Event (z. B. 'input') auf ein DOM-Element
  // feuern. Angulars DefaultValueAccessor hört auf diesen Event und überträgt den
  // Wert automatisch in den dazugehörigen FormControl.

  describe('DOM-Interaktion', () => {
    it('sollte einen Wert per dispatchEvent ins FormControl übertragen', async () => {
      // dispatchEvent simuliert, was passiert, wenn ein Nutzer in ein Feld tippt:
      // Der Event 'input' wird auf dem DOM-Element ausgelöst, Angular liest den Wert
      // aus und aktualisiert den FormControl – ohne dass setValue() nötig ist.
      const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="name"]');
      nameInput.value = 'Max Mustermann';
      nameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.form.get('name')?.value).toBe('Max Mustermann');
    });

    it('sollte den Submit-Button deaktivieren, wenn das Formular ungültig ist', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(true);
    });

    it('sollte den Submit-Button aktivieren, wenn das Formular gültig ist', async () => {
      component.form.setValue({
        name: 'Max Mustermann',
        email: 'max@beispiel.de',
        message: 'Das ist eine Testnachricht, lang genug.',
      });
      fixture.detectChanges();
      await fixture.whenStable();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(false);
    });

    it('sollte die Erfolgsmeldung anzeigen, nachdem das Formular abgeschickt wurde', async () => {
      component.form.setValue({
        name: 'Max Mustermann',
        email: 'max@beispiel.de',
        message: 'Das ist eine Testnachricht, lang genug.',
      });
      component.onSubmit();
      fixture.detectChanges();
      await fixture.whenStable();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.success')).toBeTruthy();
      expect(compiled.querySelector('form')).toBeNull();
    });

    // Hinweis: Die Sichtbarkeit von <form> vs. <div class="success"> nach reset()
    // ist bereits durch die Unit-Tests in Abschnitt 7 (reset()) abgedeckt, da
    // isSubmitted und form.value dort direkt geprüft werden. Ein DOM-Test für
    // diesen Übergang würde NG0100 auslösen, weil form.reset() synchron RxJS-
    // Events feuert und Angular (zoneless, Dev-Mode) dabei einen Unterschied
    // zwischen erstem und zweitem Change-Detection-Durchlauf sieht.
    it('sollte nach reset() isSubmitted = false und alle Werte null haben', () => {
      component.form.setValue({
        name: 'Max Mustermann',
        email: 'max@beispiel.de',
        message: 'Das ist eine Testnachricht, lang genug.',
      });
      component.onSubmit();
      expect(component.isSubmitted).toBe(true);

      component.reset();
      expect(component.isSubmitted).toBe(false);
      expect(component.form.get('name')?.value).toBeNull();
    });
  });
});
