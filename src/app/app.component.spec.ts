import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Todo: code coverage
// https://angular.dev/guide/testing/code-coverage

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should be 3', () => {
    const num1 = 1;
    const num2 = 2;
    const result = num1 + num2;

    // if (result !== 4) {
    //   throw new Error('Result is not 3');
    // }

    expect(result).toBe(3);
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mostHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    // expect(divElement?.classList.value).toContain(cssClases);
    // expect(divElement?.classList.value).toContain(cssClases);
    divElement?.classList.forEach((className) => {
      expect(mostHaveClasses).toContain(className);
    });
  });

  it('should render buy me a beer link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElement = compiled.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute('title')).toBe('Buy me a beer');
    expect(linkElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
    expect(linkElement?.getAttribute('target')).toBe('_blank');
  });
});
