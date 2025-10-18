import { Routes } from '@angular/router';
import { Pessoa } from './pages/pessoa/pessoa';
import { Aluno } from './pages/aluno/aluno';
import { TurmaListagem } from './pages/turma/turma';
import { Orcamento } from './pages/orcamento/orcamento';
import { CadastroClientes} from './pages/orcamento/cadastro-clientes/cadastro-clientes';

export const routes: Routes = [
    { path: "pessoa", component: Pessoa },
    { path: "aluno", component: Aluno },
    { path: "turma", component: TurmaListagem },
    { path: "orcamento", component: Orcamento},
    { path: "cadastro-clientes", component: CadastroClientes }
];
