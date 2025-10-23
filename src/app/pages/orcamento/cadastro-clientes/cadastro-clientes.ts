import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      possuiRestricaoAlimentar: [false], // Campo booleano para indicar restrição alimentar
      restricoesAlimentares: [{ value: '', disabled: true }] // Campo desabilitado por padrão
    });

    // Observa mudanças no campo "possuiRestricaoAlimentar" para habilitar/desabilitar o campo de restrições
    this.clienteForm.get('possuiRestricaoAlimentar')?.valueChanges.subscribe((possuiRestricao) => {
      const restricoesControl = this.clienteForm.get('restricoesAlimentares');
      if (possuiRestricao) {
        restricoesControl?.enable(); // Habilita o campo
      } else {
        restricoesControl?.disable(); // Desabilita o campo e limpa o valor
        restricoesControl?.reset();
      }
    });
  }

  ngOnInit(): void {
    this.consultarClientes(); // Carrega os clientes cadastrados
  }

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.getRawValue(); // Obtém todos os valores, incluindo campos desabilitados
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
    this.clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.consultarClientes();
    alert('Cliente deletado com sucesso!');
  }

  private consultarClientes(): void {
    const clientesCadastrados = JSON.parse(localStorage.getItem('clientes') || '[]');
    this.clientes = clientesCadastrados;
  }
}