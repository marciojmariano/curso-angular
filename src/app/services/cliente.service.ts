import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse, ClienteRequest } from '../models/cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(): Observable<ClienteResponse[]> {
    const url = "https://api.franciscosensaulas.com/api/v1/trabalho/clientes"
    return this.httpClient.get<ClienteResponse[]>(url)
  }

  create(form: ClienteRequest): Observable<void> {
    const url = "https://api.franciscosensaulas.com/api/v1/trabalho/clientes"
    return this.httpClient.post<void>(url, form)
  }

  delete(clienteId: number): Observable<void> {
    const url = `https://api.franciscosensaulas.com/api/v1/trabalho/clientes/${clienteId}`;
    return this.httpClient.delete<void>(url);
  }

  update(clienteId: number, cliente: ClienteRequest): Observable<void> {
    const url = `https://api.franciscosensaulas.com/api/v1/trabalho/clientes/${clienteId}`;
    return this.httpClient.put<void>(url, cliente);
  }

}
