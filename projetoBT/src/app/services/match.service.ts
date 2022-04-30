import { CandidaturaService } from './candidatura.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  vaga: any
  user: any
  framework = []
  linguagens = []
  tecnologias = []
  idiomas = []
  areaInteresse: string = ''
  frameworkUser = []
  linguagensUser = []
  tecnologiasUser = []
  idiomasUser = []
  areaInteresseUser: string = ''

  constructor(private serviceCandidatura: CandidaturaService) {
  }
  // getVagaInfo(idVaga: string) {
  //   this.serviceCandidatura.getUmaVaga(idVaga).pipe(take(1)).subscribe({
  //     next: doc => {
  //       // console.log('dados vaga ==> ', doc)
  //       this.vaga = {
  //         requisitos: {
  //           frameworks: doc.dados.requisitos.frameworks,
  //           linguagens: doc.dados.requisitos.linguagens,
  //           tecnologias: doc.dados.requisitos.tecnologias,
  //           idiomas: doc.dados.requisitos.idiomas
  //         },
  //         areaInteresse: doc.dados.areaInteresse
  //       }
  //       console.log('vaga ===> ', this.vaga);

  //     },
  //     error: erro => console.error(erro),
  //     complete: () => console.info('Complete')
  //   })
  // }

  // getUserInfo(idVaga: string, idUser: string) {
  //   this.serviceCandidatura.getUmCandidato(idVaga, idUser).pipe(take(1)).subscribe({
  //     next: doc => {
  //       // console.log('dados user ==> ', doc)
  //       this.user = doc
  //       console.log('user ===> ', this.user);

  //     },
  //     error: erro => console.error(erro),
  //     complete: () => console.info('Complete')
  //   })
  // }


  //Função que efetua o match da vaga com o currículo do candidato
  //Em implementação
  getMatch(idVaga: string, idUser: any) {

    // nota final
    let matchPorcentagem = 0
    // definir os pesos
    let pesoF = 30
    let pesoL = 25
    let pesoT = 15
    let pesoI = 10
    let pesoAI = 20
    // // definindo array vaga
    // let framework = ['']
    // let linguagens = ['']
    // let tecnologias = ['']
    // let idiomas = ['']
    // let areaInteresse = ['']

    // // definindo array user
    // let frameworkUser = ['']
    // let linguagensUser = ['']
    // let tecnologiasUser = ['']
    // let idiomasUser = ['']
    // let areaInteresseUser = ''

    // definir tamanho do array
    let frameworkL = 0
    let linguagensL = 0
    let tecnologiasL = 0
    let idiomasL = 0
    // inicializando contadores
    let frameworkC = 0
    let linguagensC = 0
    let tecnologiasC = 0
    let idiomasC = 0
    let areaInteresseC = 0



    this.serviceCandidatura.getUmaVaga(idVaga).subscribe({
      next: doc => {
        // console.log('doc vaga =====>', doc);

        this.framework = doc.dados.requisitos.frameworks
        this.linguagens = doc.dados.requisitos.linguagens
        this.tecnologias = doc.dados.requisitos.tecnologias
        this.idiomas = doc.dados.requisitos.idiomas
        this.areaInteresse = doc.dados.areaInteresse
        // console.log('service vaga ==> ', this.framework);
        // console.log('service vaga ==> ', this.linguagens);
        // console.log('service vaga ==> ', this.tecnologias);
        // console.log('service vaga ==> ', this.idiomas);
        // console.log('service vaga ==> ', this.areaInteresse);



      },
      error: erro => console.error(erro),
      complete: () => console.info('Complete')
    })

    this.serviceCandidatura.getUmCandidato(idVaga, idUser).pipe(take(1)).subscribe({
      next: doc => {

        this.frameworkUser = doc.dados.requisitos.frameworks
        this.linguagensUser = doc.dados.requisitos.linguagens
        this.tecnologiasUser = doc.dados.requisitos.tecnologias
        this.idiomasUser = doc.dados.requisitos.idiomas
        this.areaInteresseUser = doc.dados.areaInteresse

        // console.log('service user ==> ', this.frameworkUser);
        // console.log('service user ==> ', this.linguagensUser);
        // console.log('service user ==> ', this.tecnologiasUser);
        // console.log('service user ==> ', this.idiomasUser);
        // console.log('service user ==> ', this.areaInteresseUser);


      },
      error: erro => console.error(erro),
      complete: () => {
        console.info('Complete')

        // comparação dos arrays, caso o usuário tenha algum que é igual a vaga contador incrementa mais um
        this.framework.forEach((elementVF: any) => {
          this.frameworkUser.forEach((elementUF: any) => {
            if (elementUF == elementVF) {
              console.log('framework ', elementUF, 'E', elementVF);

              frameworkC = frameworkC + 1
            }
          })
        })

        this.linguagens.forEach((elementVL: any) => {
          this.linguagensUser.forEach((elementUL: any) => {
            if (elementUL == elementVL) {
              linguagensC = linguagensC + 1
            }
          })
        })

        this.tecnologias.forEach((elementVI: any) => {
          this.tecnologiasUser.forEach((elementUT: any) => {
            if (elementUT == elementVI) {
              tecnologiasC = tecnologiasC + 1
            }
          })
        })

        this.idiomas.forEach((elementVI: any) => {
          this.idiomasUser.forEach((elementUI: any) => {
            if (elementUI == elementVI) {
              idiomasC = idiomasC + 1
            }
          })
        })

        if (this.areaInteresse == this.areaInteresseUser) {
          areaInteresseC = 1
        } else {
          areaInteresseC = 0
        }

        let valorF = (pesoF * (this.framework.length / frameworkC))
        let valorL = (pesoL * (this.linguagens.length / linguagensC))
        let valorT = (pesoT * (this.tecnologias.length / tecnologiasC))
        let valorI = (pesoI * (this.idiomas.length / idiomasC))
        let valorAI = (pesoAI * areaInteresseC)

        if (valorF == Infinity) {
          valorF = 0
        }
        if (valorL == Infinity) {
          valorL = 0
        }
        if (valorT == Infinity) {
          valorT = 0
        }
        if (valorI == Infinity) {
          valorI = 0
        }
        if (valorAI == Infinity) {
          valorAI = 0
        }

        matchPorcentagem = (valorF + valorL + valorT + valorI + valorAI);
        // console.log('framework: tamanho', this.framework.length, ' - contador ', frameworkC, pesoF, valorF);
        // console.log('linguagens: tamanho', this.linguagens.length, ' - contador ', linguagensC, pesoL, valorL);
        // console.log('tecnologias: tamanho', this.tecnologias.length, ' - contador ', tecnologiasC, pesoT, valorT);
        // console.log('idiomas: tamanho', this.idiomas.length, ' - contador ', idiomasC, pesoI, valorI);
        // console.log('interesse: ', areaInteresseC, pesoAI, valorAI);




        console.log('valor do match: ', matchPorcentagem);

        return matchPorcentagem


      }
    })









    // this.getVagaInfo(idVaga)
    // this.getUserInfo(idVaga, idUser)
    // return 30

  }
}
