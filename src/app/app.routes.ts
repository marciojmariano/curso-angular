import { Routes } from '@angular/router';
import { Pessoa } from './pages/pessoa/pessoa';
import { Aluno } from './pages/aluno/aluno';

export const routes: Routes = [
    { path: "pessoa", component: Pessoa },
    { path: "aluno", component: Aluno }
];
