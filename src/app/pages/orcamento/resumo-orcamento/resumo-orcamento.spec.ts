import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoOrcamento } from './resumo-orcamento';

describe('ResumoOrcamento', () => {
  let component: ResumoOrcamento;
  let fixture: ComponentFixture<ResumoOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
