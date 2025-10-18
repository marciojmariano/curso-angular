import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontarRefeicoes } from './montar-refeicoes';

describe('MontarRefeicoes', () => {
  let component: MontarRefeicoes;
  let fixture: ComponentFixture<MontarRefeicoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontarRefeicoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontarRefeicoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
