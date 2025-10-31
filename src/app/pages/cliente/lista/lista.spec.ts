import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteLista } from './lista';

describe('Lista', () => {
  let component: ClienteLista;
  let fixture: ComponentFixture<ClienteLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
