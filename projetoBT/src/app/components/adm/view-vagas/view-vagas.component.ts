import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-vagas',
  templateUrl: './view-vagas.component.html',
  styleUrls: ['./view-vagas.component.css']
})
export class ViewVagasComponent implements OnInit {

  listaVagas: boolean = true

  @ViewChild('editarA') editarA: any
  @ViewChild('editarB') editarB: any

  hideEditar() {
    //Usa o classe hide do css para esconder as dives para editar vagas
    this.editarA.nativeElement.classList.toggle('hide')
    this.editarB.nativeElement.classList.toggle('hide')
  }
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }


  // mostra o componente para cadastrar uma nova vaga
  showCadastro() {
    this.listaVagas = false
  }
  // mostra o componente com a lista de vagas
  showLista() {
    this.listaVagas = true
  }

}
