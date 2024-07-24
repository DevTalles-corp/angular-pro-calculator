import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // A = Act
    const result = num1 + num2;

    // A = Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    // divElement?.classList.forEach((className) => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain the 'buy me a beer' link ", () => {
    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');

    expect(anchorElement?.href).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
    expect(anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
  });
});
