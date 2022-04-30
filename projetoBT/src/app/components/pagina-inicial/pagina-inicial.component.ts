import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CandidaturaService } from './../../services/candidatura.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { cadVaga } from 'src/app/models/vagasModel';

import { AuthService } from 'src/app/services/auth.service';
import { VagasService } from 'src/app/services/vagas.service';
import { User } from 'src/app/models/user.model';

//Import referente aos Modais
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  vagas: cadVaga[] = []


  constructor(private service: VagasService, public auth: AuthService, private candidaturaService: CandidaturaService, private router: Router,
    private modalService: BsModalService) { }//modalService criado para ser usado no Modal

  ngOnInit(): void {
    this.mostrarVagas()
  }

  mostrarVagas() {
    this.service.listarVagas().subscribe(doc => {
      this.vagas = []
      doc.forEach((element: any) => {
        this.vagas.push({
          //Coloca o id de cada linha no id
          uid: element.payload.doc.id,
          //iniciar com ... e finalizar com data() serve para não precisar colocar todos os parâmetros
          ...element.payload.doc.data()
        })
      })
    })
  }



  // chama o service de candidatura mas antes verifica se o usuário não possui cargo de admin e se está logado
  // chama o service de candidatura mas antes verifica se o usuário não possui cargo de admin e se está logado
  vagaModal!: cadVaga;
  userModal!: User;
  candidatura(vaga: cadVaga, user: User) {
    this.vagaModal = vaga
    this.userModal = user
    // verificar se o usuário é adm, se sim -> mostra modal(candidatura permitida apenas para usuários, deseja ver os candidatos dessa vaga? e redireciona pro dash)
    // verifica se o curriculo está inativo -> se sim, mostra um modal e redireciona pro preenchimento do curriculo
    // se o curriculo estiver ativo, verifica se já possui candidatura aquela vaga, se sim abre o modal avisando, se não pergunta se quer alterar algum dado e confirma a candidatura
    if (user.roles.admin == true) {
      console.log('Voce é admin');
      //Define mensagem mostrada na modal
      this.msgModal_A = 'Você possui o cargo de Administrador e não tem permissão para se candidatar. Deseja visualizar o dashboard das candidaturas?'

      //Abre o modal
      // Ao clicar em Ok na modal, o usuário será redirecionado para a página['/adm/dash/vagas']
      this.openModal(this.modal_A)


    } else if (user.curriculoAtivo == false) {
      //Define mensagem mostrada na modal
      this.msgModal_B = 'Você não possui um currículo ativo. Por favor, cadastre suas informações.';

      // Abre o modal
      this.openModal(this.modal_B)

      // redireciona pra preencher o curriculo
      //this.router.navigate(['/user/edit'])
    } else if (user.curriculoAtivo && user.cadastroAtivo) {
      // variável de controle de permissão
      let permiteCandidatura = true
      // verificar se o candidato já foi inscrito naquela vaga
      // console.log(user?.vagas);

      if (user.vagas == null) {//Se vier nullo, candidato pode ser candidatar em qualquer vaga
        permiteCandidatura = true
      } else { //se não estiver nullo será feito um forEach para comparação de quais vagas o candidato já se candidatou
        Object.values(user.vagas).forEach((val: any) => {
          if (val == vaga.uid) {

            // variável recebe false e o usuário não pode se cadastrar
            permiteCandidatura = false
          }
        })
      }

      if (permiteCandidatura) {
        // variável continua true e não possui cadastro nessa vaga, então pode realizar a candidatura
        //Você está apto para se candidatar. deseja continuar a candidatura          // Abre o modal
        this.msgModalCandidatar = 'Tem certeza que deseja se candidatar?'
        this.openModal(this.modal_Candidatar)
        // this.candidaturaService.encontrarCriarCandidatura(vaga, user)

      } else {
        // variável recebeu false pois o usuário já se candidatou nessa vaga, modal informa da condição e redireciona pra outra rota
        this.msgModal_C = 'Você já se candidatou para esta vaga!';
        // modal que não pode se cadastrar
        //console.log('voce não pode se cadastrar');

        // Abre o modal
        this.openModal(this.modal_C)
      }

    }


  }

  // **************************VISUALIZADOR VAGA**********
  @ViewChild('visual') visual: any
  @ViewChild('visualizador') visualizador: any
  @ViewChild('principal') principal: any

  vagaCandidatura!: cadVaga
  codigoControle: any
  tituloVaga: any
  descricao: any
  tipoContratacao: any
  vinculo: any
  jornada_Inicio: any
  jornada_Fim: any
  localizacao: any
  responsabilidades: any
  reqDesejaveis: any
  areaInteresse: any
  frameworks: any
  idiomas: any
  linguagens: any
  tecnologias: any
  inicial: boolean = true

  verVaga(vaga: cadVaga) {
    this.vagaCandidatura = vaga
    this.tituloVaga = vaga.dados.tituloVaga
    this.codigoControle = vaga.dados.codigoControle
    this.descricao = vaga.dados.descricao
    this.tipoContratacao = vaga.dados.tipoContratacao
    this.vinculo = vaga.dados.vinculo
    this.jornada_Inicio = vaga.dados.jornada_Inicio
    this.jornada_Fim = vaga.dados.jornada_Fim
    this.localizacao = vaga.dados.localizacao
    this.responsabilidades = vaga.dados.responsabilidades
    this.reqDesejaveis = vaga.dados.reqDesejaveis
    this.areaInteresse = vaga.dados.areaInteresse
    this.frameworks = vaga.dados.requisitos.frameworks
    this.idiomas = vaga.dados.requisitos.idiomas
    this.linguagens = vaga.dados.requisitos.linguagens
    this.tecnologias = vaga.dados.requisitos.tecnologias
    // this.areaInteresse= vaga.dados.requisitos.areaInteresse

    this.inicial = false

    this.visual.nativeElement.classList.add('bordaVisualizador')
    // this.principal.nativeElement.classList.add('heighAjust')
    this.principal.nativeElement.scrollTop = 0
  }


  ///////////////////////---------------------Inicio Modais-----------------------//////////////////////////
  // Variáveis usadas no Modal
  modalRef?: BsModalRef;
  //Variável para trocar a mensagem do Modal ao editar curriculo
  msgModal_A: string = ''
  msgModal_B: string = ''
  msgModal_C: string = ''
  msgModalCandidatar: string = ''
  msgModal_confirmaCandidatura: string = ''


  //'Pegando' as modais do html
  @ViewChild('modal_A') modal_A: any
  @ViewChild('modal_B') modal_B: any
  @ViewChild('modal_C') modal_C: any
  @ViewChild('modal_Candidatar') modal_Candidatar: any
  @ViewChild('modal_confirmaCandidatura') modal_confirmaCandidatura: any


  // Função 'genérica
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }

  // Fechar Modal A
  confirmaModal_A(): void {
    this.modalRef?.hide();
    //redirecionar para alguma página ou para um modal
    this.router.navigate(['/adm/dash/vagas'])
  }

  // Fechar Modal B
  confirmaModal_B(): void {
    this.modalRef?.hide();

  }

  // Fechar Modal B
  direcionaModal_B(): void {
    this.modalRef?.hide();
    //redirecionar para alguma página ou para um modal
    this.router.navigate(['/user/edit'])
  }

  // Fechar Modal
  confirmaModal_C(): void {
    this.modalRef?.hide();
    //redirecionar para alguma página ou para um modal
    // this.router.navigate(['/user/view'])
  }

  // Fechar Modal
  cancelarCandidatura_Modal(): void {
    this.modalRef?.hide();
  }

  // Fechar Modal
  confirmaCandidatura_Modal(): void {
    this.modalRef?.hide();
    //redirecionar para alguma página ou para um modal
    this.candidaturaService.encontrarCriarCandidatura(this.vagaModal, this.userModal).then(() => {
      this.msgModal_confirmaCandidatura = 'Sua candidatura foi realizada com sucesso!'
      this.openModal(this.modal_confirmaCandidatura)
    }).catch((error) => {
      console.log(error);
      this.msgModal_confirmaCandidatura = 'Erro ao confirmar candidatura. Caso o erro persista, por favor, entre em contato com o suporte.'
      this.openModal(this.modal_confirmaCandidatura)

    })
  }


  ///////////////////////-----------------------Fim Modais------------------------//////////////////////////


}
