import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ClienteRequest } from '../../../models/cliente.dto';
import { ClienteService } from '../../../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-cadastro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class ClienteCadastro implements OnInit {
  form: ClienteRequest;
  @Input() cliente: ClienteRequest = { nome: '', telefone: '', credito: 0 }; // Recebe dados do pai
  @Output() clienteSalvo = new EventEmitter<ClienteRequest>(); // Notifica o pai quando o cliente é salvo
  constructor(private clienteService: ClienteService) {
    this.form = {
      nome: "",
      telefone: "",
      credito: 0
    }
  }
  
  ngOnInit(): void {
  }

  cadastrar() {
    this.clienteService.create(this.form).subscribe({
      next: () => {
        alert("Cliente cadastrado com sucesso!")
        this.clienteSalvo.emit(); // Emite o evento para o pai
        this.form = { nome: '', telefone: '', credito: 0 }; // Reseta o formulário

      },
      error: erro => {
        console.log(`Ocorreu um erro ao cadastrar o cliente! ${erro}`)
        alert("Ocorreu um erro ao cadastrar o cliente!")
      }
    })
  }
}
