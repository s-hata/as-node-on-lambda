import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './component';

describe('FooterComponent', () => {

  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
