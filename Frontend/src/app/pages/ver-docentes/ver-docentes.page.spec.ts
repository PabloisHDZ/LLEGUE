import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerDocentesPage } from './ver-docentes.page';

describe('VerDocentesPage', () => {
  let component: VerDocentesPage;
  let fixture: ComponentFixture<VerDocentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDocentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
