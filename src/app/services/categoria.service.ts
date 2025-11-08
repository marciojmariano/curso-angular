import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaRequest, CategoriaResponse } from '../models/categoria.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(): Observable<CategoriaResponse[]> {
    const url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias"
    return this.httpClient.get<CategoriaResponse[]>(url)
  }

  create(form: CategoriaRequest): Observable<void> {
    const url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias"
    return this.httpClient.post<void>(url, form)
  }

}
