import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPersonaPage } from './crear-persona.page';

describe('CrearPersonaPage', () => {
  let component: CrearPersonaPage;
  let fixture: ComponentFixture<CrearPersonaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
