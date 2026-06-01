import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App (Root-Komponente)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('sollte die Root-Komponente erstellen', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sollte den Titel "Unit-Tests Demo" haben', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance.title).toBe('Unit-Tests Demo');
  });

  it('sollte den Titel im Template anzeigen', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(h1?.textContent).toContain('Unit-Tests Demo');
  });
});
