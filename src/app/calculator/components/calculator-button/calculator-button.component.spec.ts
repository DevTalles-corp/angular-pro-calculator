import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    });

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Importante
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    expect(hostCss).toContain('w-1/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    expect(hostCss).toContain('w-2/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();

    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    expect(hostCss).toContain('is-command');
  });

  it('should emit onClick when handleClick is called', () => {
    const spy = vi.spyOn(component.onClick, 'emit');

    const buttonElement = (fixture.nativeElement as HTMLElement).querySelector(
      'button'
    );

    buttonElement!.innerText = ' 9 ';

    buttonElement!.click();

    expect(buttonElement).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('9');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async () => {
    // const buttonElement = (fixture.nativeElement as HTMLElement).querySelector(
    //   'button'
    // );
    // buttonElement!.innerText = '9';
    component.contentValue()!.nativeElement.innerText = '9';

    component.keyboardPressedStyle('9');

    expect(component.isPressed()).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 101));

    // expect(false).toBe(true);
    expect(component.isPressed()).toBe(false);

    // setTimeout(() => {
    // expect(false).toBe(true);
    //   done();
    // }, 101);
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
    expect(compiled.textContent.trim()).toBe('7');
  });
});
