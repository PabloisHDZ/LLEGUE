import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoEstudiantesAutorizadoPage } from './listado-estudiantes-autorizado.page';

describe('ListadoEstudiantesAutorizadoPage', () => {
  let component: ListadoEstudiantesAutorizadoPage;
  let fixture: ComponentFixture<ListadoEstudiantesAutorizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEstudiantesAutorizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
