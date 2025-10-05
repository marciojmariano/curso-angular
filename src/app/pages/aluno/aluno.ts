import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aluno',
  imports: [FormsModule],
  templateUrl: './aluno.html',
  styleUrl: './aluno.scss'
})
export class Aluno {
  nome: string = ""
  // dataNascimento: date = ""
  peso: number = 0.0
  altura: number = 0.0
  imc: number = 0.0


calcularIMC(): void{
  this.imc = this.peso / (this.altura * this.altura)
}
}