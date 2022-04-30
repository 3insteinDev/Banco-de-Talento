import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-dash-view-candidato',
  templateUrl: './dash-view-candidato.component.html',
  styleUrls: ['./dash-view-candidato.component.css']
})
export class DashViewCandidatoComponent implements OnInit {
  user!: User
  idUser = ''
  idVaga = ''


  constructor(private serviceCurriculo: CurriculosService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idVaga = <any>this.activateRoute.snapshot.params['idVaga']

    this.idUser = <any>this.activateRoute.snapshot.params['id']
    this.serviceCurriculo.getUmCandidato(this.idUser).subscribe({
      next: doc => {
        console.log(doc)
        this.user = doc

      },
      error: erro => console.error(erro),
      complete: () => console.info('Complete')
    })
  }

  saveCurriculo() {
    this.serviceCurriculo.download(this.user.email)
  }

  voltarPagina() {
    if (this.idVaga == undefined) {
      this.router.navigate(['/adm/listUser'])
    } else {
      this.router.navigate(['/adm/dash/vagas/' + this.idVaga])
    }
  }

}
