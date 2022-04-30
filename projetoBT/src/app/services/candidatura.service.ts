import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { cadVaga } from '../models/vagasModel';
import { arrayUnion, increment } from 'firebase/firestore';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidaturaService {
  constructor(
    private firestoreAngular: AngularFirestore,
    private router: Router
  ) { }


  // saber se a vaga já tem candidatura pra saber se cria ou atualiza os dados
  async encontrarCriarCandidatura(vaga: cadVaga, user: User) {
    const doc = await firstValueFrom(this.firestoreAngular.collection('candidaturas').doc(vaga.uid).valueChanges().pipe(first()));

    if (doc) {
      console.log('atualiza');
      await this.newCandidatura(vaga, user, 'atualizar')
    } else {
      console.log('cria');

      await this.newCandidatura(vaga, user, 'criar')
    }
  }

  async getMatch(vaga: cadVaga, user: User) {
    // nota final
    let matchPorcentagem = 0
    // definir os pesos
    let pesoF = 30
    let pesoL = 25
    let pesoT = 15
    let pesoI = 10
    let pesoAI = 20
    // inicializando contadores
    let frameworkC = 0
    let linguagensC = 0
    let tecnologiasC = 0
    let idiomasC = 0
    let areaInteresseC = 0

    // definir tamanho do array
    // let frameworkL = vaga.dados.requisitos.frameworks.length
    let linguagensL = 0
    let tecnologiasL = 0
    let idiomasL = 0

    // definindo array vaga
    let framework = vaga.dados.requisitos.frameworks
    let linguagens = vaga.dados.requisitos.linguagens
    let tecnologias = vaga.dados.requisitos.tecnologias
    let idiomas = vaga.dados.requisitos.idiomas
    let areaInteresse = vaga.dados.areaInteresse

    // definindo array user
    let frameworkUser = user.curriculo?.competencia.frameworks
    let linguagensUser = user.curriculo?.competencia.linguagens
    let tecnologiasUser = user.curriculo?.competencia.tecnologias
    let idiomasUser = user.curriculo?.competencia.idiomas
    let areaInteresseUser = user.curriculo?.objetivos.areaInteresse

    // // comparação dos arrays, caso o usuário tenha algum que é igual a vaga contador incrementa mais um
    // framework.forEach((elementVF: any) => {
    //   frameworkUser.forEach((elementUF: any) => {
    //     if (elementUF == elementVF) {
    //       console.log('framework ', elementUF, 'E', elementVF);

    //       frameworkC = frameworkC + 1
    //     }
    //   })
    // })

    // linguagens.forEach((elementVL: any) => {
    //   linguagensUser.forEach((elementUL: any) => {
    //     if (elementUL == elementVL) {
    //       linguagensC = linguagensC + 1
    //     }
    //   })
    // })

    // tecnologias.forEach((elementVI: any) => {
    //   tecnologiasUser.forEach((elementUT: any) => {
    //     if (elementUT == elementVI) {
    //       tecnologiasC = tecnologiasC + 1
    //     }
    //   })
    // })

    // idiomas.forEach((elementVI: any) => {
    //   idiomasUser.forEach((elementUI: any) => {
    //     if (elementUI == elementVI) {
    //       idiomasC = idiomasC + 1
    //     }
    //   })
    // })

    // if (areaInteresse == areaInteresseUser) {
    //   areaInteresseC = 1
    // } else {
    //   areaInteresseC = 0
    // }

    // let valorF = (pesoF * (framework.length / frameworkC))
    // let valorL = (pesoL * (linguagens.length / linguagensC))
    // let valorT = (pesoT * (tecnologias.length / tecnologiasC))
    // let valorI = (pesoI * (idiomas.length / idiomasC))
    // let valorAI = (pesoAI * areaInteresseC)

    // if (valorF == Infinity) {
    //   valorF = 0
    // }
    // if (valorL == Infinity) {
    //   valorL = 0
    // }
    // if (valorT == Infinity) {
    //   valorT = 0
    // }
    // if (valorI == Infinity) {
    //   valorI = 0
    // }
    // if (valorAI == Infinity) {
    //   valorAI = 0
    // }

    // matchPorcentagem = (valorF + valorL + valorT + valorI + valorAI);
    // return matchPorcentagem


  }







  // rotina para cadastro de uma nova candidatura
  async newCandidatura(vaga: cadVaga, user: User, action: string) {
    const matchValue = await this.getMatch(vaga, user)
    // banco de dados de referencia
    const dbReferencia = this.firestoreAngular
      .collection('candidaturas')
      .doc(vaga.uid);
    try {
      const data = {
        candidaturas: increment(1),
        uid: vaga.uid,
        dados: {
          codigoControle: vaga.dados.codigoControle,
          tituloVaga: vaga.dados.tituloVaga,
          requisitos: {
            frameworks: vaga.dados.requisitos.frameworks,
            linguagens: vaga.dados.requisitos.linguagens,
            tecnologias: vaga.dados.requisitos.tecnologias,
            idiomas: vaga.dados.requisitos.idiomas,
          },
          areaInteresse: vaga.dados.areaInteresse,
        },
      }
      // seta os valores da vaga no banco de dados de referência ou atualiza
      if (action == 'criar') {
        await dbReferencia.set(data);
      } else {
        await dbReferencia.update(data)
      }
      // seta os valores do usuário no banco de dados de referencia
      await dbReferencia
        .collection('candidatos')
        .doc(user.uid)
        .set({
          uid: user.uid,
          dados: {
            nome: user.curriculo?.dados.nome,
            email: user.email,
            requisitos: {
              frameworks: user.curriculo?.competencia.frameworks,
              linguagens: user.curriculo?.competencia.linguagens,
              tecnologias: user.curriculo?.competencia.tecnologias,
              idiomas: user.curriculo?.competencia.idiomas,
            },
            areaInteresse: user.curriculo?.objetivos.areaInteresse,
            pretensao: user.curriculo?.objetivos.pretensao,
          },
          dataCandidatura: new Date(),
          statusEmail: false,
          match: 0
        });
      // acrescenta a vaga cadastrada na collection do usuário
      await this.firestoreAngular
        .collection('users')
        .doc(user.uid)
        .update({ vagas: arrayUnion(vaga.uid) });

      console.log('candidato adicionado');
    } catch (error) {
      console.error(error);
    }
  }

  //listar as vagas com candidatura
  listVagas(): Observable<any> {
    return this.firestoreAngular.collectionGroup('candidaturas',).valueChanges();
  }
  // listar os candidatos relacionados aquela vaga
  listCandidaturas(vagaUID: string): Observable<any> {
    return this.firestoreAngular
      .collection('candidaturas')
      .doc(vagaUID)
      .collection('candidatos')
      .valueChanges();
  }

  getUmaVaga(id: any): Observable<any> {
    return this.firestoreAngular.collection('candidaturas').doc(id).valueChanges()
  }
  getUmCandidato(idVaga: any, idUser: any): Observable<any> {
    return this.firestoreAngular.collection('candidaturas').doc(idVaga).collection('candidatos').doc(idUser).valueChanges()
  }
  attUmCandidato(idVaga: any, idUser: any, data: any): Promise<any> {
    return this.firestoreAngular.collection('candidaturas').doc(idVaga).collection('candidatos').doc(idUser).update(data)
  }

}
