import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPersonaPage } from './editar-persona.page';

describe('EditarPersonaPage', () => {
  let component: EditarPersonaPage;
  let fixture: ComponentFixture<EditarPersonaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
