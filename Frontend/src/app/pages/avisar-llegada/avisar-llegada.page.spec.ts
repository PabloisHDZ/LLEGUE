import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisarLlegadaPage } from './avisar-llegada.page';

describe('AvisarLlegadaPage', () => {
  let component: AvisarLlegadaPage;
  let fixture: ComponentFixture<AvisarLlegadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisarLlegadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
