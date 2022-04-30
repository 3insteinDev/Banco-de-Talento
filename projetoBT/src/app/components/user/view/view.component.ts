import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CurriculosService } from 'src/app/services/curriculos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  user!: Observable<any>
  tituloCurriculo: any
  idUser: any


  constructor(
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private serviceCurriculo: CurriculosService,
    private modalService: BsModalService
  ) {
    this.afAuth.currentUser.then(data => {
      console.log(data?.uid);
      this.tituloCurriculo = data?.email
      this.idUser = data?.uid
    }, (error) => {
      console.log(error);
    })
    // this.serviceCurriculo.getUmCandidato(this.idUser).subscribe({
    //   next: doc => {
    //     console.log(doc)
    //     this.user = doc

    //   },
    //   error: erro => console.error(erro),
    //   complete: () => console.info('Complete')
    // })

    // se o usuário estiver logado vamos pegar os dados do firestore
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  ngOnInit(): void {
  }

  editCurriculo() {
    this.router.navigate(['/user/edit'])
  }

  saveCurriculo() {

    console.log(this.tituloCurriculo);

    this.serviceCurriculo.download(this.tituloCurriculo)
  }

  // Quando o candidato desejar ativar ou desativar seu currículo para receber ou não contato
  // se quer arquivar manda false pro service, se quer ativar o currículo manda true
  arquivaCadastro() {
    // chama o modal pra explicar e dizer que pode ser ativado posteriormente
    this.msgModal_A = 'Ao continuar com esta ação você deixará de participar dos nossos processos seletivos. Posteriormente será possível ativar seu cadastro novamente. Deseja continuar?'
    this.openModal(this.modal_A)
  }
  desarquivaCadastro() {
    // chama o modal pra explicar e dizer que pode ser ativado posteriormente
    this.msgModal_A = 'Deseja ativar seu cadastro novamente?'
    this.openModal(this.modal_B)
  }

  /////////////////////////// MODAIS
  // Variáveis usadas no Modal
  modalRef?: BsModalRef;
  msgModal_A: string = ''

  //'Pegando' as modais do html
  @ViewChild('modal_A') modal_A: any
  @ViewChild('modal_B') modal_B: any


  // Função 'genérica
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' })
  }

  confirmaModal_A() {
    this.serviceCurriculo.arquivaCandidato(this.idUser, false).then(() => {
      console.log('desativa');
      console.log(this.user);

      this.modalRef?.hide();
    }).catch((error) => {
      console.log(error);

    })


  }

  cancelaModal() {
    console.log('cancela');
    this.modalRef?.hide();

  }

  confirmaModal_B() {
    this.serviceCurriculo.arquivaCandidato(this.idUser, true).then(() => {

      this.modalRef?.hide();
    }).catch((error) => {
      console.log(error);

    })



  }

}
