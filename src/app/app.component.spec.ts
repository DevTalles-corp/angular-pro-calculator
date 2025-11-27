import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [AppComponent],
  //   }).compileComponents();
  // });

  it('should be 4', () => {
    // Arrange
    const num1 = 1;
    const num2 = 3;

    // Act
    const result = num1 + num2;

    // Assert
    // if (result !== 4) {
    //   throw new Error('El resultado debe de ser 4');
    // }
    expect(result).toBe(4);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.querySelector('a')?.innerHTML);

    expect(appComponent).toBeTruthy();
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
      'min-h-screen min-w-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    // expect(divElement?.classList.value).toBe(mostHaveClasses);
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
