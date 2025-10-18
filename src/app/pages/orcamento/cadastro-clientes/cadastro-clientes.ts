import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true, // Indica que este é um Standalone Component
  imports: [CommonModule, ReactiveFormsModule], // Importa ReactiveFormsModule aqui
  templateUrl: './cadastro-clientes.html',
  styleUrls: ['./cadastro-clientes.scss']
})
export class CadastroClientes {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^(\(\d{2}\) \d{5}-\d{4})$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      restricoesAlimentares: ['']
    });
  }

  salvarCliente() {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      localStorage.setItem('cliente', JSON.stringify(clienteData));
      alert('Cliente salvo com sucesso!');
      this.clienteForm.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}