import { User } from 'src/app/models/user.model';
import { SuperAdminService } from './../../../services/super-admin.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  @ViewChild('concederPermissao') concederPermissao: any
  @ViewChild('retirarPermissao') retirarPermissao: any

  usuarios: User[] = []
  administradores: User[] = []

  usuarioID: string = ''
  usuarioEmail: string = ''
  adminID: string = ''
  adminEmail: string = ''

  constructor(private serviceSuperAdmin: SuperAdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.mostrarUsers()
    this.mostrarAdmins()
  }


  hideConceder() {
    this.concederPermissao.nativeElement.classList.toggle('hide')
    this.retirarPermissao.nativeElement.classList.add('hide')


  }
  hideRetirar() {
    this.retirarPermissao.nativeElement.classList.toggle('hide')
    this.concederPermissao.nativeElement.classList.add('hide')
  }
  // mostra uma lista dos usuários
  mostrarUsers() {
    this.serviceSuperAdmin.listUsers().subscribe({
      next: doc => {
        console.log(doc)
        this.usuarios = []
        doc.forEach((element: any) => {
          this.usuarios.push({
            uid: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })

      },
      error: erro => console.error(erro),
      complete: () => {
        console.log('Complete')

      }
    })
  }

  // mostra uma lista dos administradores
  mostrarAdmins() {
    this.serviceSuperAdmin.listAdmins().subscribe({
      next: doc => {
        console.log(doc)
        this.administradores = []
        doc.forEach((element: any) => {
          this.administradores.push({
            uid: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })

      },
      error: erro => console.error(erro),
      complete: () => {
        console.log('Complete')

      }
    })
  }
  // função chama o modal para confirmar ou nao a ação de tornar o usuário admin
  makeAdmin(userID: string, userEmail: string) {
    this.usuarioID = userID
    this.usuarioEmail = userEmail
    this.msgModalConceder = `Essa ação irá tornar o usuário do email (${userEmail}) um administrador dessa aplicação. Deseja continuar?`
    this.openModal(this.modal_Conceder)

  }

  // função chama o modal para confirmar ou nao a ação de retirar o admin do usuário
  makeUser(adminID: string, adminEmail: string) {
    this.adminID = adminID
    this.adminEmail = adminEmail
    this.msgModalRetirar = `Essa ação irá retirar as permissões de administrador do usuário com o email (${adminEmail}). Deseja continuar?`
    this.openModal(this.modal_Retirar)
  }


  ///////////////////// Modais
  modalRef?: BsModalRef;

  msgModalConceder: string = ''
  msgModalRetirar: string = ''
  msgModal_confirma: string = ''

  @ViewChild('modal_Conceder') modal_Conceder: any
  @ViewChild('modal_Retirar') modal_Retirar: any
  @ViewChild('modal_confirma') modal_confirma: any


  // Função 'genérica
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }



  // funções dos botões
  cancelarModal() {
    this.modalRef?.hide();


  }
  confirmaConcederModal() {
    this.modalRef?.hide();
    // chama o service para conceder a permissão, ou seja, atualizar o user para admin: true
    this.serviceSuperAdmin.concederAdmin(this.usuarioID).then(() => {
      this.msgModal_confirma = `As permissões de Administrador foram concedidas à ${this.usuarioEmail}.`
      this.openModal(this.modal_confirma)

    }).catch((error) => {
      console.log(error);
      this.msgModal_confirma = `Não foi possível conceder permissões de administrador à ${this.usuarioEmail}. Caso o erro persista, contate o suporte.`
      this.openModal(this.modal_confirma)
    })


  }

  confirmaRetirarModal() {
    this.modalRef?.hide();
    // chama o service para retirar a permissão, ou seja, atualizar o user para admin: false
    this.serviceSuperAdmin.retirarAdmin(this.adminID).then(() => {
      this.msgModal_confirma = `As permissões de Administrador foram retiradas de ${this.adminEmail}.`
      this.openModal(this.modal_confirma)
    }).catch((error) => {
      this.msgModal_confirma = `Não foi possível retirar as permissões de administrador à ${this.usuarioEmail}. Caso o erro persista, contate o suporte.`
      this.openModal(this.modal_confirma)

    })



  }


}
