import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Turma {
  id: number;
  nome: string;
  sigla: string;
}

export interface TurmaCadastro {
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-turma',
  imports: [FormsModule],
  templateUrl: './turma.html',
  styleUrl: './turma.scss'
})
export class TurmaListagem {
  form: TurmaCadastro;
  turmas: Turma[];
  proximoId: number;
  idParaEditar: number | null;

  constructor() {
    this.form = {
      nome: "", sigla: ""
    };
    this.proximoId = 1;

    this.turmas = [];
    this.idParaEditar = null;

  }

  cadastrar() {
    const id = this.proximoId++;
    // debugger;
    let turma: Turma = {
      id: id,
      nome: this.form.nome,
      sigla: this.form.sigla
    }
    this.turmas.push(turma);
  }

  editar() {
    const indiceParaEditar = this.turmas.findIndex(turma => turma.id === this.idParaEditar);
    this.turmas [indiceParaEditar].nome = this.form.nome;
    this.turmas [indiceParaEditar].sigla = this.form.sigla;
  }

  salvar() {
    if (this.idParaEditar === null) {
      this.cadastrar();
    } else {
      this.editar();
    }
    this.limparCampos();
  }

  limparCampos() {
    this.form = {
      nome: "",
      sigla: ""
    }
    this.idParaEditar = null;
  }

  apagar(turma: Turma): void {
    const confirmado = confirm(`Deseja realmente apagar '${turma.nome}'`)
    if (confirmado === true) {
      let indiceParaApagar = this.turmas.indexOf(turma);
      this.turmas.splice(indiceParaApagar, 1);
    }
  }

  preencherCamposParaEditar(turma: Turma): void {
    this.idParaEditar = turma.id;

    this.form = {
      nome: turma.nome,
      sigla: turma.sigla
    }
  }

}
