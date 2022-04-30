
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { cadVaga } from '../models/vagasModel';
import { increment } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class VagasService {

  //O subject permite fazer um subscribe dentro da variável
  private vagaSub = new Subject<any>()

  constructor(private firestoreAngular: AngularFirestore) { }

  //Adicionar nova vaga
  addVaga(vaga: cadVaga): Promise<any> {
    return this.firestoreAngular.collection('cadastroVaga').add(vaga)
  }

  //Edit vaga
  editarVaga(id: any, vaga: any): Promise<any> {
    //o .doc irá funcionar como o where do sql

    return this.firestoreAngular.collection('cadastroVaga').doc(id).update(vaga)
  }

  //Listar funcionários
  listarVagas(): Observable<any> {
    return this.firestoreAngular.collection('cadastroVaga', ordem => ordem.orderBy('dados.codigoControle')).snapshotChanges()
  }

  //Esta função sera usada no ícone do edit na lista de vagas.
  mostrarVaga(vaga: cadVaga) {
    const teste = this.vagaSub.next(vaga)
  }

  //Observable envolve visualização, ex: Read (listar, ler)
  getVaga(): Observable<cadVaga> {
    return this.vagaSub.asObservable()
  }

  //Quando existe algum tipo de ação, ex: deletar, adicionar e editar.
  deletarVaga(id: string): Promise<any> {
    return this.firestoreAngular.collection('cadastroVaga').doc(id).delete()
  }

  ///////////// lógica para a incrementação do código de controle
  /////inicializar a collection de stats com o o documento de controle para o código de vagas
  addDocStats(): Promise<any> {
    return this.firestoreAngular.doc('/stats/controleVagas').set({ codControle: 0 })
  }
  // pegar o valor atual
  getValorAtual(): Observable<any> {
    return this.firestoreAngular.doc('/stats/controleVagas').valueChanges()
  }
  // atualizar o valor
  updateDocStats(): Promise<any> {
    return this.firestoreAngular.doc('/stats/controleVagas').update({ codControle: increment(1) })
  }

}
