import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { vi } from 'vitest';

// Esto sólo para la última prueba
@Component({
  // standalone: true, // not needed in v21
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content"> 7 </span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent], // CalculatorButtonComponent no es necesario porque está importado arriba
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // importante para que detecte los cambios en el template iniciales
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    // console.log(compiled.outerHTML);
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    const hostCss = fixture.nativeElement.classList;
    expect(hostCss).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCss = fixture.nativeElement.classList;
    expect(hostCss).toContain('w-2/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('is-command');
  });

  it('should emit onClick when handleClick is called', () => {
    const spy = vi.spyOn(component.onClick, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.innerText = ' 9 '; // El espacio es importante para asegurar que el texto sea '9' (trim)

    // component.handleClick();
    buttonElement.click();

    expect(spy).toHaveBeenCalledWith('9');
  });

  // Esta prueba verifica que cuando el método keyboardPressedStyle es llamado con una tecla
  // que coincide con el texto interno del botón ('9'), la señal isPressed se establezca en true
  // de forma inmediata y luego vuelva a false después de 100 ms, simulando el efecto visual
  // de que el botón ha sido "presionado" desde el teclado.
  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', (done) => {
    // Se configura el texto interno del botón a '9', para emular el contenido del botón en el DOM.
    component.contentValue()!.nativeElement.innerText = '9';

    // Se llama a keyboardPressedStyle con la tecla '9', que debe coincidir con el texto anterior.
    component.keyboardPressedStyle('9');

    // Después de llamar al método, isPressed debe ser true (el botón aparenta estar presionado).
    expect(component.isPressed()).toBe(true);

    // Se espera 101 ms, suficiente para superar el timeout dentro de keyboardPressedStyle,
    // y luego se verifica que isPressed haya vuelto a false (el botón ya no está presionado).
    setTimeout(() => {
      expect(component.isPressed()).toBe(false);
      done();
    }, 101);
  });

  it('should NOT set isPressed if key does not match', () => {
    component.contentValue()!.nativeElement.innerText = '9';

    component.keyboardPressedStyle('8');

    expect(component.isPressed()).toBe(false);
  });

  it('should display projected content', () => {
    const fixtureHost = TestBed.createComponent(TestHostComponent);
    fixtureHost.detectChanges();
    const compiled = fixtureHost.nativeElement as HTMLElement;
    expect(compiled.querySelector('.projected-content')).toBeTruthy();
    expect(compiled.textContent?.trim()).toBe('7');
  });
});
