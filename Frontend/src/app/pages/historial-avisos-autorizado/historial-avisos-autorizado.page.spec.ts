import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialAvisosAutorizadoPage } from './historial-avisos-autorizado.page';

describe('HistorialAvisosAutorizadoPage', () => {
  let component: HistorialAvisosAutorizadoPage;
  let fixture: ComponentFixture<HistorialAvisosAutorizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAvisosAutorizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
