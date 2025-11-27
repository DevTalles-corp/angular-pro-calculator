import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
})
export default class CalculatorViewComponent {}
