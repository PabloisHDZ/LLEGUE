import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearEstudiantePage } from './crear-estudiante.page';

describe('CrearEstudiantePage', () => {
  let component: CrearEstudiantePage;
  let fixture: ComponentFixture<CrearEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
