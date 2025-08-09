import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertasDocentePage } from './alertas-docente.page';

describe('AlertasDocentePage', () => {
  let component: AlertasDocentePage;
  let fixture: ComponentFixture<AlertasDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
