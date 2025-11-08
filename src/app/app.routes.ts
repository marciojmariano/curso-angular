import { Routes } from '@angular/router';
import { Pessoa } from './pages/pessoa/pessoa';
import { Aluno } from './pages/aluno/aluno';
import { TurmaListagem } from './pages/turma/turma';
import { Orcamento } from './pages/orcamento/orcamento';
import { CadastroClientes } from './pages/orcamento/cadastro-clientes/cadastro-clientes';
import { ConsultaClientes } from './pages/orcamento/consulta-clientes/consulta-clientes';
import { CategoriaLista } from './pages/categoria/lista/lista';
import { ClienteLista } from './pages/cliente/lista/lista';
import { ClienteCadastro } from './pages/cliente/cadastro/cadastro';
import { ClienteExcluir } from './pages/cliente/excluir/excluir';
import { ClienteAlterar } from './pages/cliente/alterar/alterar';


export const routes: Routes = [
    { path: "pessoa", component: Pessoa },
    { path: "aluno", component: Aluno },
    { path: "turma", component: TurmaListagem },
    { path: "orcamento", component: Orcamento },
    { path: "cadastro-clientes", component: CadastroClientes },
    { path: "consulta-clientes", component: ConsultaClientes },
    { path: "categoria", component: CategoriaLista},
    { path: "cliente", component: ClienteLista},
    { path: "cadastro", component: ClienteCadastro},
    { path: "excluir", component: ClienteExcluir},
    { path: "alterar", component: ClienteAlterar}
];
