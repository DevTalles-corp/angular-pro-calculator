import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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
    // todo:
  });

  it('should handle keyboard events correctly', () => {
    // todo:
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    // todo:
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    // todo:
  });

  it('should call keyboardPressedStyle on all buttons when key is pressed', () => {
    // todo:
  });

  it('should update resultText signal when service updates', () => {
    // todo:
  });

  it('should have 19 calculator-button components with content projected', () => {
    // todo:
  });
});
