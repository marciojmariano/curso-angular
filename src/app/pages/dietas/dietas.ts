import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dietas',
  imports: [FormsModule, CommonModule],
  templateUrl: './dietas.html',
  styleUrl: './dietas.scss'
})
export class Dietas {
ingredientes: string[] = [];
novoIngrediente: string = '';
}



adicionarIngrediente() {
  if ((this.novoIngrediente ?? '').trim()) {
    this.ingredientes.push((this.novoIngrediente ?? '').trim());
    this.novoIngrediente = '';
  }
}

function adicionarIngrediente() {
  throw new Error('Function not implemented.');
}
