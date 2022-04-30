import { SendMailServiceService } from './../../../services/send-mail-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidaturaService } from './../../../services/candidatura.service';
import { AfterViewChecked, AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, first } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dash-candidatos',
  templateUrl: './dash-candidatos.component.html',
  styleUrls: ['./dash-candidatos.component.css'],
})
export class DashCandidatosComponent implements OnInit, AfterViewInit {
  subscription!: Subscription

  idVaga = '';
  candidatos: any;
  idUser = ''
  tituloVaga: any
  candidatoEmail: any
  candidatoNome: any
  matchValue: any;



  //////////////////////////////// cálculo do match
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

  // nota final
  matchPorcentagem = 0
  // definir os pesos
  pesoF = 30
  pesoL = 25
  pesoT = 15
  pesoI = 10
  pesoAI = 20
  // inicializando contadores
  frameworkC = 0
  linguagensC = 0
  tecnologiasC = 0
  idiomasC = 0
  areaInteresseC = 0
  valorF: number = 0
  valorL: number = 0
  valorT: number = 0
  valorI: number = 0
  valorAI: number = 0



  constructor(
    private serviceCandidatura: CandidaturaService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    public matchService: MatchService,
    private serviceSendMail: SendMailServiceService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.idVaga = <any>this.activateRoute.snapshot.params['id'];
    this.getVaga();
    console.log('to no init');

  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.listCandidatos(); }, 1000)
    console.log('to no after');


  }

  // dados da vaga
  getVaga() {
    this.serviceCandidatura.getUmaVaga(this.idVaga).subscribe({
      next: doc => {
        // console.log(doc)
        // console.log(doc.dados.tituloVaga)
        this.tituloVaga = doc.dados.tituloVaga

        this.framework = doc.dados.requisitos.frameworks
        this.linguagens = doc.dados.requisitos.linguagens
        this.tecnologias = doc.dados.requisitos.tecnologias
        this.idiomas = doc.dados.requisitos.idiomas
        this.areaInteresse = doc.dados.areaInteresse

      },
      error: erro => console.error(erro),
      complete: () => {
        console.log('Complete')

      }
    })
  }

  // listar candidatos
  listCandidatos() {
    this.serviceCandidatura
      .listCandidaturas(this.idVaga).pipe(first())
      .subscribe((resultado) => {
        this.candidatos = [];
        // console.log(resultado);

        resultado.forEach((element: any) => {
          // console.log('candidatos ', element.candidatos);

          this.frameworkUser = element.dados.requisitos.frameworks
          this.linguagensUser = element.dados.requisitos.linguagens
          this.tecnologiasUser = element.dados.requisitos.tecnologias
          this.idiomasUser = element.dados.requisitos.idiomas
          this.areaInteresseUser = element.dados.areaInteresse


          // comparação dos arrays, caso o usuário tenha algum que é igual a vaga contador incrementa mais um
          this.framework.forEach((elementVF: any) => {
            this.frameworkUser.forEach((elementUF: any) => {
              if (elementUF == elementVF) {
                this.frameworkC = this.frameworkC + 1
              }
            })
          })

          this.linguagens.forEach((elementVL: any) => {
            this.linguagensUser.forEach((elementUL: any) => {
              if (elementUL == elementVL) {
                this.linguagensC = this.linguagensC + 1
              }
            })
          })

          this.tecnologias.forEach((elementVI: any) => {
            this.tecnologiasUser.forEach((elementUT: any) => {
              if (elementUT == elementVI) {
                this.tecnologiasC = this.tecnologiasC + 1
              }
            })
          })

          this.idiomas.forEach((elementVI: any) => {
            this.idiomasUser.forEach((elementUI: any) => {
              if (elementUI == elementVI) {
                this.idiomasC = this.idiomasC + 1
              }
            })
          })

          if (this.areaInteresse == this.areaInteresseUser) {
            this.areaInteresseC = 1
          } else {
            this.areaInteresseC = 0
          }

          this.valorF = (this.pesoF * (this.framework.length / this.frameworkC))
          this.valorL = (this.pesoL * (this.linguagens.length / this.linguagensC))
          this.valorT = (this.pesoT * (this.tecnologias.length / this.tecnologiasC))
          this.valorI = (this.pesoI * (this.idiomas.length / this.idiomasC))
          this.valorAI = (this.pesoAI * this.areaInteresseC)

          if (this.valorF == Infinity) {
            this.valorF = 0
          }
          if (this.valorL == Infinity) {
            this.valorL = 0
          }
          if (this.valorT == Infinity) {
            this.valorT = 0
          }
          if (this.valorI == Infinity) {
            this.valorI = 0
          }
          if (this.valorAI == Infinity) {
            this.valorAI = 0
          }

          this.matchValue = Math.floor(this.valorF + this.valorL + this.valorT + this.valorI + this.valorAI);

          console.log('candidato', element.dados.email, 'valor do match: ', this.matchValue);
          if (isNaN(this.matchValue)) {


            this.matchValue = 0
          } else if (this.matchValue > 100) {
            this.matchValue = 100
          } else {
            this.matchValue = this.matchValue
          }



          this.candidatos.push({
            uid: element.uid,
            dados: {
              email: element.dados.email,
              nome: element.dados.nome,
              requisitos: {
                frameworks: element.dados.requisitos.frameworks,
                linguagens: element.dados.requisitos.linguagens,
                tecnologias: element.dados.requisitos.tecnologias,
                idiomas: element.dados.requisitos.idiomas,
              },
              areaInteresse: element.dados.areaInteresse,
              pretensao: element.dados.pretensao,
            },
            dataCandidatura: element.dataCandidatura,
            statusEmail: element.statusEmail,
            match: this.matchValue
          });
        });
      });
  }
  visualizarCandidato(idUser: string) {
    this.router.navigate(['/adm/dash/candidato/' + this.idVaga + '/' + idUser]);
    console.log(this.candidatos);

  }
  match(idVaga: any, idUser: any) {
    this.matchService.getMatch(idVaga, idUser)
  }
  mandarEmail(candidatoEmail: any, candidatoNome: any, candidatoId: any) {
    this.candidatoEmail = candidatoEmail
    this.candidatoNome = candidatoNome
    this.idUser = candidatoId

    // console.log(candidatoEmail);
    // console.log(candidatoNome);
    // console.log(this.tituloVaga);
    this.msgModal = `Enviar email de notificação negativa sobre o processo seletivo para ${candidatoNome}, no email ${candidatoEmail} sobre a vaga ${this.tituloVaga}?`

    this.openModal(this.confirmaEmail)
  }

  /////////////// Modal para confirmar se realmente quer mandar o email sinalizando que o contato não foi selecionado
  @ViewChild('confirmaEmail') confirmaEmail: any
  @ViewChild('emailEnviado') emailEnviado: any


  // Variáveis usadas no Modal
  modalRef?: BsModalRef;
  msgModal: string = ''

  // Função 'genérica
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }

  // Fechar Modal A
  confirmarEmail(): void {
    this.modalRef?.hide();
    // aqui chama o service

    // implementar futuramente aqui variavel de controle pra informar qual candidato ja mandou email

    this.subscription = this.serviceSendMail.sendEmail(this.candidatoEmail, this.candidatoNome, this.tituloVaga).subscribe(data => {
      this.msgModal = 'Email enviado com sucesso!'
      this.openModal(this.emailEnviado)

    }, error => {
      console.error(error, "error");
    });

    this.serviceCandidatura.attUmCandidato(this.idVaga, this.idUser, { statusEmail: true })

  }

  // Fechar Modal
  fechaModal(): void {
    location.reload()
    this.modalRef?.hide();
  }


}
