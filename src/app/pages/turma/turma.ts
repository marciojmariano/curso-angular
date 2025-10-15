// Componente Angular, escrito em TypeScript que implementa um CRUD para gerenciar turmas.
//      * O componente permite cadastrar, editar, salvar, limpar campos e apagar turmas, 
//        além de preencher campos para edição.

// Define a classe como um componente Angular;
import { Component } from '@angular/core';

// Habilita o uso de formulários no componente;
import { FormsModule } from '@angular/forms';

// Representa uma turma cadastrada no sistema, ou seja, um item completo da lista de turmas.
// Define a estrutura para o cadastro de uma Turma com os atributos id, nome e sigla;
export interface Turma {
  id: number;
  nome: string;
  sigla: string;
}

//  Define a estrutura do formulário cadastro/edição com os atributos nome e sigla;
export interface TurmaCadastro {
  nome: string;
  sigla: string;
}

// Marca a classe como um componente Angular e configura seus metadados;
@Component({
  //  Define o seletor CSS que identifica o componente no HTML, com isso, o componente será renderizado
  //  sempre que o Angular encontrar a tag <app-turma> no HTML.
  selector: 'app-turma', 
  imports: [FormsModule], //Inclui o módulo FormsModule para habilitar o uso de formulários;
  templateUrl: './turma.html', //Referencia o arquivo HTML que contém o template do componente;
  styleUrl: './turma.scss' //Referencia o arquivo SCSS que contém os estilos do componente;
})

// Define a classe do componente TurmaListagem com suas propriedades e métodos;
// A classe gerencia o estado e o comportamento do componente, incluindo a lógica para 
// cadastrar, editar, salvar, limpar campos e apagar turmas.
export class TurmaListagem {
  form: TurmaCadastro; //Representa o formulário de cadastro/edição de turmas. Inicialmente, é um objeto vazio;
  turmas: Turma[]; //Armazena a lista de turmas cadastradas. Inicialmente, é um array vazio;
  proximoId: number; //Mantém o próximo ID disponível para uma nova turma. Inicialmente, é definido como 1;
  idParaEditar: number | null; //Armazena o ID da turma que está sendo editada. Inicialmente, é nulo, indicando que nenhuma turma está sendo editada;

// Método construtor que inicializa as propriedades do componente;
//      * Inicializa o formulário com campos vazios.
//      * Define o próximo ID como 1.
//      * Inicializa a lista de turmas como um array vazio.
//      * Define idParaEditar como nulo, indicando que nenhuma turma está sendo editada.
// Observação: Usar o constructor() para injeção de dependências e configuração básica.
// Deixar lógicas mais complexa para os métodos do ciclo de vida, como ngOnInit.
  constructor() {
    this.form = {
      nome: "", sigla: ""
    };
    this.proximoId = 1;

    this.turmas = [];
    this.idParaEditar = null;

  }

  // Método para cadastrar uma nova turma;
  //      * Cria uma nova turma com um ID único (proximoId) e os dados do formulário.
  //      * Adiciona a nova turma ao array turmas.
  //      * Incrementa o proximoId para garantir IDs únicos.
  cadastrar() {
    const id = this.proximoId++;
    // debugger;
    let turma: Turma = {
      id: id,
      nome: this.form.nome,
      sigla: this.form.sigla
    }
    this.turmas.push(turma);
  }

  // Método para editar uma turma existente;
  //      * Localiza o índice da turma a ser editada no array turmas com base no idParaEditar.
  //      * Atualiza os campos nome e sigla da turma com os valores do formulário.
  editar() {
    const indiceParaEditar = this.turmas.findIndex(turma => turma.id === this.idParaEditar);
    this.turmas[indiceParaEditar].nome = this.form.nome;
    this.turmas[indiceParaEditar].sigla = this.form.sigla;
  }

  // Método para salvar as alterações no formulário;
  // Decide entre cadastrar uma nova turma ou editar uma existente com base no valor de idParaEditar.
  // Após a operação, limpa os campos do formulário chamando o método limparCampos.
  //      * Verifica se idParaEditar é nulo. Se for, chama o método cadastrar() para criar uma nova turma.
  //      * Se idParaEditar não for nulo, chama o método editar() para atualizar a turma existente.
  //      * Após salvar, chama o método limparCampos() para resetar o formulário e o estado de edição.
  salvar() {
    if (this.idParaEditar === null) {
      this.cadastrar();
    } else {
      this.editar();
    }
    this.limparCampos();
  }

  // Método para limpar os campos do formulário e resetar o estado de edição;
  //      * Reseta os campos do formulário para valores vazios.
  //      * Define idParaEditar como nulo, indicando que nenhuma turma está sendo editada.
  limparCampos() {
    this.form = {
      nome: "",
      sigla: ""
    }
    this.idParaEditar = null;
  }

  // Método para apagar uma turma existente;
  //      * Solicita confirmação do usuário antes de apagar a turma.
  //      * Se confirmado, localiza o índice da turma no array turmas e a remove usando splice.
  apagar(turma: Turma): void {
    const confirmado = confirm(`Deseja realmente apagar '${turma.nome}'`)
    if (confirmado === true) {
      let indiceParaApagar = this.turmas.indexOf(turma);
      this.turmas.splice(indiceParaApagar, 1);
    }
  }

  // Método para preencher os campos do formulário com os dados de uma turma existente para edição;
  //      * Define o idParaEditar com o ID da turma selecionada, permitindo que o método editar saiba qual turma atualizar.
  //      * Preenche os campos do formulário com os valores nome e sigla da turma para edição.
  preencherCamposParaEditar(turma: Turma): void {
    this.idParaEditar = turma.id;

    this.form = {
      nome: turma.nome,
      sigla: turma.sigla
    }
  }

}

// FLUXO DE OPERAÇÕES**

// 1. **Cadastro de Turmas:**
//    - O usuário preenche o formulário e clica em "Salvar".
//    - Como `idParaEditar` é `null`, o método `cadastrar` é chamado.
//    - A nova turma é adicionada à lista `turmas`.

// 2. **Edição de Turmas:**
//    - O usuário seleciona uma turma para editar.
//    - O método `preencherCamposParaEditar` preenche o formulário com os dados da turma.
//    - O usuário altera os dados e clica em "Salvar".
//    - Como `idParaEditar` não é `null`, o método `editar` é chamado.

// 3. **Exclusão de Turmas:**
//    - O usuário clica em um botão para apagar uma turma.
//    - O método `apagar` exibe uma confirmação e remove a turma da lista.

// 4. **Limpeza do Formulário:**
//    - Após salvar ou cancelar uma operação, o formulário é limpo com o método `limparCampos`.
