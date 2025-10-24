import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaClientes } from '../consulta-clientes/consulta-clientes'; // Ajuste o caminho conforme sua estrutura de pastas

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConsultaClientes],
  templateUrl: './cadastro-clientes.html',
  styleUrls: ['./cadastro-clientes.scss']
})
export class CadastroClientes implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = []; // Lista de clientes cadastrados

  constructor(private fb: FormBuilder) {
    // Inicializa o formulário no constructor
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^(\(\d{2}\) \d{5}-\d{4})$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      possuiRestricaoAlimentar: [false],
      restricoesAlimentares: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Carrega os clientes cadastrados ao iniciar o componente
    this.consultarClientes();

    // Configura o comportamento dinâmico do campo de restrições alimentares
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

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.getRawValue();
      clienteData.dataNascimento = new Date(clienteData.dataNascimento); // Converte para Date
      const clientesExistentes = this.obterClientesDoLocalStorage();
      clientesExistentes.push(clienteData);
      localStorage.setItem('clientes', JSON.stringify(clientesExistentes));
      this.consultarClientes(); // Atualiza a lista no pai (e consequentemente no filho)
      alert('Cliente salvo com sucesso!');
      this.clienteForm.reset();
      // Resetar o estado do checkbox e do campo de restrições após salvar
      this.clienteForm.get('possuiRestricaoAlimentar')?.setValue(false);
      this.clienteForm.get('restricoesAlimentares')?.disable();
      this.clienteForm.get('restricoesAlimentares')?.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  handleClienteDeletado(index: number): void {
    const clientesExistentes = this.obterClientesDoLocalStorage();
    clientesExistentes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientesExistentes));
    this.consultarClientes(); // Atualiza a lista no pai (e consequentemente no filho)
    alert('Cliente deletado com sucesso!');
  }

  private consultarClientes(): void {
    this.clientes = this.obterClientesDoLocalStorage();
  }

  private obterClientesDoLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
  }
}