import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class MockCalculatorService {
  resultText = signal('100');
  subResultText = signal('20');
  lastOperator = signal('-');
  constructNumber = vi.fn();
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(() => {
    mockCalculatorService = new MockCalculatorService();

    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalculatorService,
        },
      ],
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Importante
  });

  it('should create', () => {
    // const compiled = fixture.nativeElement as HTMLElement;
    // // console.log(compiled.innerHTML);
    // console.log({
    //   resultText: component.resultText(),
    //   subResultText: component.subResultText(),
    //   lastOperator: component.lastOperator(),
    // });

    expect(component).toBeTruthy();
  });

  it('should have initial values from service', () => {
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display values in the template', () => {
    mockCalculatorService.resultText.set('50');
    mockCalculatorService.subResultText.set('10');
    mockCalculatorService.lastOperator.set('-');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const resultTextElement = compiled.querySelector('[test-id="result-text"]');
    const subResultTextElement = compiled.querySelector('.text-4xl');

    expect(resultTextElement?.innerHTML).toBe('50');
    expect(subResultTextElement?.innerHTML).toContain('10 - ');
  });

  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
  });

  it('should handle keyboard events correctly', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should call constructNumber when button is clicked', () => {
    // todo:
    const buttons = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );

    const button = buttons[0];
    button.triggerEventHandler('onClick', 'C');

    expect(buttons.length).toBe(19);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should update resultText signal when service updates', () => {
    mockCalculatorService.resultText.set('999');
    fixture.detectChanges();

    expect(component.resultText()).toBe('999');
  });

  it('should have 19 calculator-button components with content projected', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);

    expect(buttons[0].querySelector('button')?.innerHTML).toContain('C');
    expect(buttons[1].querySelector('button')?.innerHTML).toContain('+/-');
    expect(buttons[2].querySelector('button')?.innerHTML).toContain('%');
    expect(buttons[3].querySelector('button')?.innerHTML).toContain('÷');
  });
});
