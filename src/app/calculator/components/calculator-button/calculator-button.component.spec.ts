import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

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
    // todo:
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', (done) => {
    // todo:
  });

  it('should NOT set isPressed if key does not match', () => {
    // todo:
  });

  it('should display projected content', () => {
    // todo:
  });
});
