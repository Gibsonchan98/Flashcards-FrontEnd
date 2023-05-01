import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';
import { FooterComponent } from '../footer/footer.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FooterComponent],
      declarations: [LandingComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Flashy logo', () => {
    const logoElement = fixture.nativeElement.querySelector('#flashcards');
    expect(logoElement.src).toContain('/assets/images/vectores/flashcards.svg');
  });

  it('should display the app name', () => {
    const nameElement = fixture.nativeElement.querySelector('#name');
    expect(nameElement.textContent).toBe(' Flashy ');
  });

  it('should display the app description', () => {
    const descriptionElement = fixture.nativeElement.querySelector('h2');
    expect(descriptionElement.textContent).toBe(' A simple app that keeps track of flashcards');
  });

  it('should navigate to the Library page when the "View Library" button is clicked', () => {
    spyOn(component['router'], 'navigateByUrl');
    const viewButton = fixture.nativeElement.querySelector('#viewButton');
    viewButton.click();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('Library');
  });

  it('should navigate to the Create page when the "Create New Deck" button is clicked', () => {
    spyOn(component['router'], 'navigateByUrl');
    const createButton = fixture.nativeElement.querySelector('#createButton');
    createButton.click();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('Create');
  });

  it('should fade in the content on initialization', () => {
    expect(fixture.nativeElement.querySelector('.Title').classList).toContain('show');
  });
});
