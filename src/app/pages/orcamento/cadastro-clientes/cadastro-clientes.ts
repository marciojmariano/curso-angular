import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true, // Define que este é um Standalone Component
  imports: [CommonModule, ReactiveFormsModule], // Importa ReactiveFormsModule aqui
  templateUrl: './cadastro-clientes.html',
  styleUrls: ['./cadastro-clientes.scss']
})
export class CadastroClientes {
  clienteForm: FormGroup;
  clientes: any[] = []; // Lista de clientes cadastrados

  constructor(private fb: FormBuilder) {
    // Inicializa o formulário
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^(\(\d{2}\) \d{5}-\d{4})$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      restricoesAlimentares: ['']
    });
  }

  ngOnInit(): void {
    this.consultarClientes(); // Carrega os clientes cadastrados
  }

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');
      clientesExistentes.push(clienteData);
      localStorage.setItem('clientes', JSON.stringify(clientesExistentes));
      this.consultarClientes();
      alert('Cliente salvo com sucesso!');
      this.clienteForm.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  deletarCliente(index: number): void {
    // Remove o cliente da lista com base no índice
    this.clientes.splice(index, 1);

    // Atualiza o Local Storage
    localStorage.setItem('clientes', JSON.stringify(this.clientes));

    // Atualiza a exibição
    this.consultarClientes();

    alert('Cliente deletado com sucesso!');
  }

  private consultarClientes(): void {
    const clientesCadastrados = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.clientes = clientesCadastrados;
  }
}