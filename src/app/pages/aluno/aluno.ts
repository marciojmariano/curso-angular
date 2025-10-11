import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aluno',
  imports: [FormsModule, CommonModule],
  templateUrl: './aluno.html',
  styleUrl: './aluno.scss'
})
export class Aluno {
  nome: string = "";
  dataNascimento: Date | null = null;
  idade: number | null = null;
  peso: number | null = null;
  altura: number | null = null;
  imc: number | null = null;
  mensagemIMC: string = "";
  mensagemIdade: string = "";
  mensagemAniversario: string = "";
  categoriaImc: string = ""

  calcularIMC(): void {
    if (this.peso !== null && this.altura !== null && this.altura > 0) {
      const pesoValido = this.peso;
      const alturaValida = this.altura;
      this.imc = pesoValido / (alturaValida * alturaValida);
      this.mensagemIMC = "IMC:";
    } else {
      this.mensagemIMC = "Por favor, informe valores válidos para peso e altura!";
    }
  }

 verificarCategoriaImc(): void {
  if (this.imc === null) {
    return;
  }

  if (this.imc < 18.5) {
    this.categoriaImc = " - Baixo peso";
  } else if (this.imc >= 18.5 && this.imc <= 24.9) {
    this.categoriaImc = " - Normal";
  } else if (this.imc >= 25.0 && this.imc <= 29.9) {
    this.categoriaImc = " - Sobrepeso";
  } else if (this.imc >= 30.0 && this.imc <= 34.9) {
    this.categoriaImc = " - Obesidade Grau I";
  } else if (this.imc >= 35.0 && this.imc <= 39.9) {
    this.categoriaImc = " - Obesidade Grau II";
  } else if (this.imc >= 40.0) {
    this.categoriaImc = " - Obesidade Grau III";
  } else {
    this.categoriaImc = "Erro ao calcular a categoria do IMC.";
  }
}

  onDataNascimentoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const data = new Date(input.value + "T00:00:00");

    if (!isNaN(data.getTime())) {
      this.dataNascimento = data;
    } else {
      this.dataNascimento = null;
      console.error('Data de nascimento inválida!');
    }
  }

  calcularIdade(): void {
    this.mensagemIdade = "";
    this.mensagemAniversario = "";

    if (this.dataNascimento) {
      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();

      const anoNascimento = this.dataNascimento.getFullYear();
      const mesNascimento = this.dataNascimento.getMonth();
      const diaNascimento = this.dataNascimento.getDate();

      // Calcula a idade inicial
      this.idade = anoAtual - anoNascimento;
      this.mensagemIdade = "Idade: "

      // Verifica se o aniversário ainda não aconteceu neste ano
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        this.idade -= 1;
      }

      // Verifica se hoje é o aniversário
      if (mesAtual === mesNascimento && diaAtual === diaNascimento) {
        this.mensagemAniversario = " - Feliz aniversário, aproveite seu dia!";
      }
    } else {
      this.mensagemIdade = "Por favor, informe a data de nascimento!";
    }
  }
}