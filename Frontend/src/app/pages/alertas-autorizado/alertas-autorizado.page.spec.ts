import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertasAutorizadoPage } from './alertas-autorizado.page';

describe('AlertasAutorizadoPage', () => {
  let component: AlertasAutorizadoPage;
  let fixture: ComponentFixture<AlertasAutorizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasAutorizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
