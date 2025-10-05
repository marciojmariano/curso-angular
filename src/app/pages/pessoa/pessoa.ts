import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pessoa',
  imports: [FormsModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.scss'
})
export class Pessoa {
  // Propriedade
  titulo: string = "Exemplo 1: Apresentação de variável"
  quantidade: number = 0
  nomeCompleto?: string | null
  nome: string = ""
  sobrenome: string = ""
  idade: number = 0
  anoNascimento?: number | null

  // Método sem retorno
  alterarTitulo(): void {
    // let nome = "Francisco";
    // console.log(nome);
    // alert(this.titulo)
    this.titulo = "Apresentação de variável"
  }
  incrementar(): void {
    this.quantidade = this.quantidade + 1
  }
  concatenar(): void {
    //let nome: string = "Márcio";
    //let sobrenome: string = "Mariano";
    // let nomeCompleto: string = nome + " " + sobrenome;
    let nomeCompleto: string = this.nome + " " + this.sobrenome;
    this.nomeCompleto = nomeCompleto;
    this.anoNascimento = 2025 - this.idade
  }
}
