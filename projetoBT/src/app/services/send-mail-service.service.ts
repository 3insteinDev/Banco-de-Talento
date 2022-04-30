import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinfo } from '../models/info.model';

@Injectable({
  providedIn: 'root'
})
export class SendMailServiceService {

  constructor(private http: HttpClient) { }

  sendEmail(email: any, nome: any, vaga: any): Observable<Iinfo> {
    return this.http.post<Iinfo>(`http://localhost:3000/sendFormData/${email}/${nome}/${vaga}`, this.sendEmail)
  }
}
