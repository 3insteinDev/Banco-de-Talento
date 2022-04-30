import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Candidato } from '../models/candidatosModel';

declare var html2pdf: any

@Injectable({
  providedIn: 'root',
})
export class CurriculosService {
  // criação da variável candidatoEdit para permitir que seja feito um subscribe dentro da variável
  private candidatoEdit = new Subject<any>();
  element!: any


  constructor(private firestoreAngular: AngularFirestore) { }


  //adicionar novo currículo
  addCurriculo(user: User): Promise<any> {
    return this.firestoreAngular.doc(`users/${user.uid}`).update(user)
  }


  //listar todos os candidatos
  listCandidato(): Observable<any> {
    return this.firestoreAngular
      .collection('users')
      .snapshotChanges();
  }

  //listar os candidatos com curriculo válido
  listCandidatoFull(): Observable<any> {
    return this.firestoreAngular
      .collection('users', (verdadeiro) => verdadeiro.where('curriculoAtivo', '==', true).where('cadastroAtivo', '==', true))
      .snapshotChanges();
  }
  // busca de candidato na lista de curriculos
  buscar(CampoPesquisado: any, atributoPesquisado: any): Observable<any> {
    return this.firestoreAngular.collection('users', (buscar) => buscar.where(atributoPesquisado, "==", CampoPesquisado)).snapshotChanges();
  }

  //arquiva candidato
  arquivaCandidato(id: string, value: boolean): Promise<any> {
    return this.firestoreAngular.collection('users').doc(id).update({ curriculoAtivo: value });
  }

  // //desativar Curriculo
  // desativarCurriculo(id: string): Promise<any> {
  //   return this.firestoreAngular.collection('users').doc(id).update({ curriculoAtivo: false });
  // }

  // get candidato (pegar os candidatos)
  getCandidato(): Observable<Candidato> {
    return this.candidatoEdit.asObservable();
  }
  // get um candidato (pegar um candidato específico pelo id)
  getUmCandidato(id: any): Observable<any> {
    return this.firestoreAngular.collection('users').doc(id).valueChanges()
  }
  // mostrar Candidato será utilizado no momento da edição
  mostrarCandidatoEdit(candidato: User) {
    this.candidatoEdit.next(candidato);
  }

  /////// rotinas para implementações futuras - candidato selecionado





  // FUNÇÃO PARA DOWNLOAD DE PDF
  public download(nomeArquivo: string) {

    //Coloca na variável conteudoDownload o conteúdo da div que queremos efetuar o download
    const conteudoDownload = document.getElementById("curriculo")!;
    //Define o tamanho da fonte
    conteudoDownload.style.fontSize = '11px';

    const opt = {
      //Define as margens
      // margin: [0, 0, 0, 0],
      margintop: [2],
      padding: [0],
      //image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        useCORS: true,
        dpi: 96
      },
      jsPDF: {
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      },
    }

    html2pdf()
      //Pega o conteúdo do documento
      .from(conteudoDownload)
      //Define as propriedades
      .set(opt)
      //Converte para pdf
      .toPdf()
      .get('pdf').then(function (pdf: any) {
        //Pega o total de páginas do documento
        var totalPages = pdf.internal.getNumberOfPages();

        //Cria um laço para adicionar todas as páginas no documento
        for (let i = 1; i <= totalPages; i++) {

          if (i == 1) {
            pdf.setPage(i);
          }
          pdf.setPage(i);
          pdf.setFontSize(6);
          pdf.setTextColor(75);
          //pdf.text('\\n Pagina ' + i + ' de ' + totalPages, 175, (pdf.internal.pageSize.getHeight() - 8));
        }
      })
      //Salva o arquivo no formato pdf
      .save(nomeArquivo + ".pdf");





    //     this.element = document.getElementById('curriculo')

    //     console.log('curriculo: ' + this.element)

    //     var opt = {
    //       margin:       [0,0,0,0],
    //       filename:     'myfile.pdf',
    //       image:        { type: 'jpeg', quality: 0.98 },
    //       html2canvas:  { scale: 2 },
    //       jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    //     };

    //     html2pdf().from(this.element).set(opt).save()
  }





}
