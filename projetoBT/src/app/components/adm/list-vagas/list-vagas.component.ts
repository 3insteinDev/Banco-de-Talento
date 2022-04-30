import { cadVaga } from 'src/app/models/vagasModel';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { VagasService } from 'src/app/services/vagas.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ViewVagasComponent } from '../view-vagas/view-vagas.component';



@Component({
  selector: 'app-list-vagas',
  templateUrl: './list-vagas.component.html',
  styleUrls: ['./list-vagas.component.css']
})
export class ListVagasComponent implements OnInit {

  // Inicio Modal
  modalRef?: BsModalRef;
  messageBotao1?: string = 'Excluir'
  messageBotao2?: string = 'Cancelar'
  idExcluir: string | undefined


  // Abrir modal de confirmação de registro incluído
  openModalExcluir(modalExcluir: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(modalExcluir, { class: 'modal-sm' })
    this.idExcluir = id
  }

  // Fechar Modal quando clicar em ok
  simExcluir(): void {
    this.modalRef?.hide();
    this.excluirVaga(this.idExcluir)
    // this.router.navigate(['/home'])
  }

  //Modal não Excluir (Cancelar)
  naoExcluir(): void {
    this.modalRef?.hide();
    // this.router.navigate(['/adm/cadVagas'])
  }

  // Editar Vagas
  openModalEditVagas(template: TemplateRef<any>, vaga: cadVaga) {
    //this.router.navigate(['adm/editVagas'])
  }


  // Fim Modal


  vagas: cadVaga[] = []

  constructor(private service: VagasService, private modalService: BsModalService, private router: Router, private hideEdit: ViewVagasComponent) { }

  ngOnInit(): void {
    this.mostrarVagas()
  }


  mostrarVagas() {
    this.service.listarVagas().subscribe(doc => {
      this.vagas = []
      doc.forEach((element: any) => {
        //console.log(element.payload.doc.id,'==>ID Payload');

        this.vagas.push({
          //Coloca o id de cada linha no id
          //Responsável por fazer a edição das vagas
          uid: element.payload.doc.id,


          //iniciar com ... e finalizar com data() serve para não precisar colocar todos os parâmetros
          ...element.payload.doc.data()
        })
      })
    })
  }

  editarVaga(vaga: cadVaga) {
    this.service.mostrarVaga(vaga)

    //Função que esconde a div Editar Vagas
    this.hideEdit.hideEditar()
  }

  excluirVaga(id: any) {
    this.service.deletarVaga(id)
  }

}
