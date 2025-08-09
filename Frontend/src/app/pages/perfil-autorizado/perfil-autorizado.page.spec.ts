import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilAutorizadoPage } from './perfil-autorizado.page';

describe('PerfilAutorizadoPage', () => {
  let component: PerfilAutorizadoPage;
  let fixture: ComponentFixture<PerfilAutorizadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAutorizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
