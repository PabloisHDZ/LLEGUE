import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialAvisosDocentePage } from './historial-avisos-docente.page';

describe('HistorialAvisosDocentePage', () => {
  let component: HistorialAvisosDocentePage;
  let fixture: ComponentFixture<HistorialAvisosDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAvisosDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
