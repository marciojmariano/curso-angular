import { Component, OnInit } from '@angular/core';
import { CategoriaRequest, CategoriaResponse } from '../../../models/categoria.dto';
import { CategoriaService } from '../../../services/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-lista',
  imports: [FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class CategoriaLista implements OnInit {
  categorias: CategoriaResponse[] = [];
  form: CategoriaRequest;
  constructor(private categoriaService: CategoriaService) {
    this.form = {
      nome: ""
    }

  }

  ngOnInit(): void {
    this.consultarCategorias();
  }

  consultarCategorias() {
    this.categoriaService.getAll().subscribe({
      next: categorias => this.categorias = categorias,
      error: erro=>{
        console.error(`Ocorreu um erro ao carregar a lista de categorias! ${erro}`)
        alert("Ocorreu um erro ao consultar as categorias!")
      }
    })

  }
cadastrar(){
  this.categoriaService.create(this.form).subscribe({
    next : ()=> {
      this.consultarCategorias()
      alert("Categoria cadastrada com sucesso!")
    },
    error: erro=>{
      console.log(`Ocorreu um erro ao cadastrar a categoria! ${erro}`)
      alert("Ocorreu um erro ao cadastrar a categoria!")
    }
  })
}

}