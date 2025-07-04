import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePadrePage } from './home-padre.page';

describe('HomePadrePage', () => {
  let component: HomePadrePage;
  let fixture: ComponentFixture<HomePadrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
