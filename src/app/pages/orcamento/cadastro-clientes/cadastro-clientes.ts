// src/app/orcamento/cadastro-cliente/cadastro-cliente.component.ts
import { Component, OnInit } from '@angular/core'; // Adicionado OnInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Importa o componente filho ConsultaClientes
import { ConsultaClientes } from '../consulta-clientes/consulta-clientes'; // Ajuste o caminho conforme sua estrutura de pastas

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  // Importa o ReactiveFormsModule, CommonModule e o componente filho
  imports: [CommonModule, ReactiveFormsModule, ConsultaClientes],
  templateUrl: './cadastro-clientes.html',
  styleUrls: ['./cadastro-clientes.scss']
})
export class CadastroClientes implements OnInit { // Implementa OnInit
  clienteForm: FormGroup;
  clientes: any[] = []; // Lista de clientes cadastrados, gerenciada pelo pai

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^(\(\d{2}\) \d{5}-\d{4})$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      possuiRestricaoAlimentar: [false],
      restricoesAlimentares: [{ value: '', disabled: true }]
    });

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
    this.consultarClientes(); // Carrega os clientes cadastrados ao iniciar o componente
    // Definimos a regex para o formato (XX) XXXXX-XXXX
    const celularRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: [''],
      // Adicionamos Validators.required e Validators.pattern com a nossa regex
      celular: ['', [Validators.required, Validators.pattern(celularRegex)]],
      email: ['', [Validators.email]], // Exemplo de outro validador embutido
      endereco: [''],
      possuiRestricaoAlimentar: [false],
      restricoesAlimentares: [{ value: '', disabled: true }]
    });

  }

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.getRawValue();
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

  // Novo método para lidar com o evento de deleção vindo do componente filho
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

  /**
   * Método reutilizável para obter a lista de clientes do Local Storage
   */
  private obterClientesDoLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('clientes') || '[]');
  }
}