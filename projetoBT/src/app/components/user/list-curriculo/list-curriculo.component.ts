import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { Candidato as User } from 'src/app/models/candidatosModel';
import { User } from 'src/app/models/user.model';
import { CurriculosService } from 'src/app/services/curriculos.service';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-list-curriculo',
  templateUrl: './list-curriculo.component.html',
  styleUrls: ['./list-curriculo.component.css']
})
export class ListCurriculoComponent implements OnInit {

  candidatos: User[] = []
  formPesquisa: FormGroup

  @ViewChild('listCurriculo') listCurriculo: any

  constructor(private serviceCurriculo: CurriculosService, private router: Router, private fb: FormBuilder) {
    this.formPesquisa = this.fb.group({
      campoPesquisado: '',
      campoRadio: 'curriculo.dados.nome'
    })
  }

  ngOnInit(): void {
    this.listCandidatos()
  }

  listCandidatos() {
    this.serviceCurriculo.listCandidatoFull().subscribe(doc => {
      this.candidatos = []
      doc.forEach((element: any) => {
        this.candidatos.push({
          uid: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  editCandidato(candidato: User) {
    this.serviceCurriculo.mostrarCandidatoEdit(candidato)
    // this.router.navigate(['/user/editCurriculo/' + id])

  }

  // implementação futura caso o admin queira arquivar o candidato
  // arquivaCandidato(id: any) {
  //   this.serviceCurriculo.arquivaCandidato(id).then(() => {
  //     console.log('Cadastro arquivado.')
  //   }, error => console.error(error)
  //   )
  // }

  visualizarCandidato(idUser: string) {
    console.log(idUser);
    this.router.navigate(['/adm/dash/candidato/' + idUser]);
  }

  pesquisar() {

    if (this.formPesquisa.value.campoPesquisado == '') {
      this.listCandidatos()
    } else {
      let pesquisa = this.formPesquisa.value.campoPesquisado
      if (this.formPesquisa.value.campoRadio != 'email') {
        pesquisa = pesquisa.toUpperCase()
      }

      this.serviceCurriculo.buscar(pesquisa, this.formPesquisa.value.campoRadio).subscribe(doc => {
        this.candidatos = []
        doc.forEach((element: any) => {
          this.candidatos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
      console.log(this.formPesquisa.value.campoRadio);
      console.log(this.formPesquisa.value.campoPesquisado.toUpperCase())

    }
  }
}
