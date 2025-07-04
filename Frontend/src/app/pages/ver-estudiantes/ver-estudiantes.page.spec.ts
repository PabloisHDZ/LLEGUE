import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEstudiantesPage } from './ver-estudiantes.page';

describe('VerEstudiantesPage', () => {
  let component: VerEstudiantesPage;
  let fixture: ComponentFixture<VerEstudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
