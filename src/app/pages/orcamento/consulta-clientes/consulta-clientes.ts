// src/app/orcamento/cadastro-cliente/consulta-cliente/consulta-cliente.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngFor e @if

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule], // Adicione CommonModule aqui
  templateUrl: './consulta-clientes.html', 
  styleUrl: './consulta-clientes.scss' // 
})
export class ConsultaClientes { 
  // @Input para receber a lista de clientes do componente pai
  @Input() clientes: any[] = [];

  // @Output para emitir o evento de deleção para o componente pai
  // O EventEmitter<number> indica que ele emitirá um número (o índice do cliente)
  @Output() clienteDeletado = new EventEmitter<number>();

  constructor() { }

  // Método para emitir o evento de deleção
  // Ele não deleta diretamente, apenas informa ao pai qual cliente deve ser deletado
  deletarCliente(index: number): void {
    this.clienteDeletado.emit(index);
  }
}