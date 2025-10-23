import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaClientes } from '../consulta-clientes/consulta-clientes';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConsultaClientes], //importado o componente filho ConsultaClientes
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
      possuiRestricaoAlimentar: [false],
      restricoesAlimentares: [{ value: '', disabled: true }]
    });

    // Observa mudanças no campo "possuiRestricaoAlimentar"
    this.clienteForm.get('possuiRestricaoAlimentar')?.valueChanges.subscribe((possuiRestricao) => {
      const restricoesControl = this.clienteForm.get('restricoesAlimentares');
      if (possuiRestricao) {
        restricoesControl?.enable();
      } else {
        restricoesControl?.disable();
        restricoesControl?.reset();
      }
    });
  }

  ngOnInit(): void {
    this.consultarClientes(); // Carrega os clientes cadastrados
  }

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.getRawValue();
      const clientesExistentes = this.obterClientesDoLocalStorage(); // Usa o método reutilizável
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
    const clientesExistentes = this.obterClientesDoLocalStorage(); // Usa o método reutilizável
    clientesExistentes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientesExistentes));
    this.consultarClientes();
    alert('Cliente deletado com sucesso!');
  }

  private consultarClientes(): void {
    this.clientes = this.obterClientesDoLocalStorage(); // Usa o método reutilizável
  }

  /**
   * Método reutilizável para obter a lista de clientes do Local Storage
   */
  private obterClientesDoLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
  }
}