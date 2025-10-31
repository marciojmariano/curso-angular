import { Component, OnInit } from '@angular/core';
import { ClienteRequest, ClienteResponse } from '../../../models/cliente.dto';
import { ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ClienteCadastro } from '../cadastro/cadastro';


@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [CommonModule, ClienteCadastro],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class ClienteLista implements OnInit {
  clientes: ClienteResponse[] = [];
  clienteParaEditar: ClienteRequest | null = null;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.consultarClientes();
  }
  consultarClientes() {
    this.clienteService.getAll().subscribe({
      next: clientes => this.clientes = clientes,
      error: erro => {
        console.error(`Ocorreu um erro ao carregar a lista de clientes! ${erro}`)
        alert("Ocorreu um erro ao consultar os clientes!")
      }
    }
    )
  }

  selecionarCliente(cliente: ClienteResponse): void {
    // Prepara o cliente para edição
    this.clienteParaEditar = { ...cliente }; // Faz uma cópia do cliente selecionado
  }
  deletarCliente(clienteId: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.delete(clienteId).subscribe({
        next: () => {
          alert('Cliente deletado com sucesso!');
          this.consultarClientes(); // Atualiza a lista após a exclusão
        },
        error: (erro) => {
          console.error(`Erro ao deletar cliente: ${erro}`);
          alert('Ocorreu um erro ao deletar o cliente.');
        }
      });
    }
  }


  onClienteSalvo(): void {
    // Atualiza a lista de clientes
    this.consultarClientes();
  }
}
