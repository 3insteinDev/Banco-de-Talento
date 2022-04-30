import { Router } from '@angular/router';
import { CandidaturaService } from './../../../services/candidatura.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dash-vagas',
  templateUrl: './dash-vagas.component.html',
  styleUrls: ['./dash-vagas.component.css']
})
export class DashVagasComponent implements OnInit {
  vagas: any

  @ViewChild('dashVagas') dashVagas: any

  constructor(private serviceCandidatura: CandidaturaService, private router: Router) { }

  ngOnInit(): void {
    this.listVagas()
  }

  listVagas() {
    this.serviceCandidatura.listVagas().subscribe(resultado => {
      this.vagas = []
      console.log(resultado);

      resultado.forEach((element: any) => {
        console.log('candidatos ', element.candidatos);


        // this.serviceCandidatura.getUmaVaga(element.uid).subscribe({
        //   next: teste => {
        //     console.log(teste.dados.codigoControle)
        //     this.vagas = teste as string
        //     // this.vagas.push({
        //     //   codigoControle: teste.dados?.codigoControle
        //     // })
        //   },
        //   error: erro => console.error(erro),
        //   complete: () => console.info('Complete')
        // })

        this.vagas.push({
          candidaturas: element.candidaturas,
          uid: element.uid,
          dados: {
            codigoControle: element.dados.codigoControle,
            tituloVaga: element.dados.tituloVaga,
            requisitos: {
              frameworks: element.dados.requisitos.frameworks,
              linguagens: element.dados.requisitos.linguagens,
              tecnologias: element.dados.requisitos.tecnologias,
              idiomas: element.dados.requisitos.idiomas,
            },
            areaInteresse: element.dados.areaInteresse,
          },
        })
      })
    })
  }

  visualizarCandidaturas(vagaID: string) {
    console.log(vagaID);
    this.router.navigate(['/adm/dash/vagas/' + vagaID])
  }

}
