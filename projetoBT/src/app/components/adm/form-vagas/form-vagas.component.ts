import { take } from 'rxjs/operators';
import { Competencia, Vaga } from './../../../models/user.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { cadVaga } from './../../../models/vagasModel';
import { VagasService } from 'src/app/services/vagas.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ViewVagasComponent } from '../view-vagas/view-vagas.component';

@Component({
  selector: 'app-form-vagas',
  templateUrl: './form-vagas.component.html',
  styleUrls: ['./form-vagas.component.css']
})
export class FormVagasComponent implements OnInit {

  // Inicio Modal
  modalRef?: BsModalRef;
  message?: string;
  // Fim Modal

  form: FormGroup
  cad_Vaga: any
  id: string | undefined

  admId: string | undefined
  admEmail: any

  // Inicializando os valores de array que serão mostrados nas opções de cadastro de vagas
  frameworks = ['ANGULAR', 'ASP.NET', 'DJANGO', 'DRUPAL', 'EXPRESS', 'FLASK', 'GATSBY', 'JQUERY', 'LARAVEL', 'REACT.JS', 'RUBY ON RAILS', 'SPRING', 'SYMFONY', 'VUE.JS']
  linguagens = ['ASSEMBLY', 'C/C++', 'C#', 'CSS3', 'DART', 'GO', 'HTML5', 'JAVA', 'JAVASCRIPT', 'JULIA', 'KOTLIN', 'OBJECTIVE-C', 'PERL', 'PHP', 'PYTHON', 'R', 'RUBY', 'RUST', 'SQL', 'SWIFT', 'TYPESCRIPT', 'VBA']
  tecnologias = ['ANDROID', 'AWS', 'CASSANDRA', 'DOCKER', 'DYNAMODB', 'ELASTICSEARCH', 'FIREBASE', 'GOOGLE CLOUD PLATAFORM', 'HEROKU', 'IOS', 'KUBERNETES', 'LINUX', 'MACOS', 'MICROSOFT SQL SERVER', 'MONGODB', 'MYSQL', 'NODEJS', 'ORACLE', 'POSTGRESQL', 'SQLITE']
  idiomas = ['ALEMÃO', 'ÁRABE', 'ESPANHOL', 'FRANCÊS', 'INGLÊS', 'JAPONÊS', 'MANDARIM']

  @ViewChild('atualizarVaga') atualizarVaga: any
  @ViewChild('incluirVaga') incluirVaga: any

  constructor(private fb: FormBuilder, private service: VagasService,
    private router: Router, private route: ActivatedRoute,
    private afAuth: AngularFireAuth, private modalService: BsModalService,
    private hideEdit: ViewVagasComponent) {

    //Rotina para verificar o usuário logado e pegar
    //as informações necessárias para serem armazenadas
    //junto ao cadastro da vaga no rastro.
    this.afAuth.currentUser.then(data => {//se existir id será colocado no parametro data.
      console.log(data?.uid, "uid do usuário logado ==>")
      this.admId = data?.uid
      console.log(data?.email, "email ==>")
      this.admEmail = data?.email

    }, (error) => {
      console.log(error)
    });



    //Inicializar os campos como vazio
    this.form = this.fb.group({
      codigoControle: [''],
      tituloVaga: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipoContratacao: ['', [Validators.required]],
      vinculo: [''],
      jornada_Inicio: [''],
      jornada_Fim: [''],
      localizacao: ['SÃO PAULO/SP'],
      responsabilidades: ['', [Validators.required]],
      frameworks: this.buildFrameworks(),
      linguagens: this.buildLinguagens(),
      tecnologias: this.buildTecnologias(),
      idiomas: this.buildIdiomas(),
      reqDesejaveis: [''],
      areaInteresse: ['', [Validators.required]],
    })
  }



  ngOnInit(): void {
    //Resultado é um parametro criado agora
    this.service.getVaga().subscribe((doc) => {
      this.id = doc.uid
      console.log(doc.uid, 'ngOnInit ==>');

      //patchValue é utilizado para preecher os inputs do form
      this.form.patchValue({
        codigoControle: doc.dados.codigoControle,
        tituloVaga: doc.dados.tituloVaga,
        descricao: doc.dados.descricao,
        tipoContratacao: doc.dados.tipoContratacao.toLowerCase(),
        vinculo: doc.dados.vinculo,
        jornada_Inicio: doc.dados.jornada_Inicio,
        jornada_Fim: doc.dados.jornada_Fim,
        localizacao: doc.dados.localizacao,
        responsabilidades: doc.dados.responsabilidades,
        frameworks: this.buildEditFrameworks(doc.dados.requisitos.frameworks),
        linguagens: this.buildEditLinguagens(doc.dados.requisitos.linguagens),
        tecnologias: this.buildEditTecnologias(doc.dados.requisitos.tecnologias),
        idiomas: this.buildEditIdiomas(doc.dados.requisitos.idiomas),
        reqDesejaveis: doc.dados.reqDesejaveis,
        areaInteresse: doc.dados.areaInteresse.toLowerCase()
      })
    })
  }


  // Abrir modal de confirmação de registro incluído
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }

  // Botão Fechar da Modal
  confirmaInclusao(): void {
    this.message = 'ok!';
    this.modalRef?.hide();
    this.hideEdit.showLista()
    //Esconde a div Editar Vagas
    //this.hideEdit.hideEditar()
  }

  confirmaAtualizacao(): void {
    this.message = 'ok!';
    this.modalRef?.hide();
    this.router.navigate(['/adm/viewVagas'])

    //Esconde a div Editar Vagas
    this.hideEdit.hideEditar()
  }

  // Botão Nova Vaga da Modal
  novaVaga(): void {
    this.message = 'Nova Vaga!';
    this.modalRef?.hide();
    this.form.reset({ localizacao: 'SÃO PAULO/SP', areaInteresse: '' })
    this.hideEdit.showCadastro()
    //Leva a página para o topo depois de clicar no botão Nova Vaga
    document.documentElement.scrollTop = 0;
  }



  salvarVaga() {
    //se o ID estiver vazio, iremos cadastrar uma nova vaga
    if (this.id === undefined) {
      this.atualizarCodControleVaga()
      console.log(this.id, '==>id')


    } else {
      //se o ID não estiver vazio iremos chamar a função editar vaga
      this.editarVaga()
    }
  }

  atualizarCodControleVaga() {
    this.service.updateDocStats().then(() => {
      console.log('atualizou');
      this.service.getValorAtual().pipe(take(1)).subscribe({
        next: doc => {
          console.log(doc.codControle)
          this.cadastrarVaga(doc.codControle)
        },
        error: erro => console.error(erro),
        complete: () => {
          console.log('Complete')

        }
      })

    }).catch((error) => {
      console.log(error);
    })
  }

  cadastrarVaga(codControle: number) {
    //Pegar os valores do formulário HTML e colocar na const VAGA
    const VAGA: cadVaga = {
      dataCriacao: new Date,
      dataAtualizacao: new Date,
      dataTermino: new Date,
      ativo: true,
      dados: {
        codigoControle: codControle,
        tituloVaga: this.form.value.tituloVaga.toUpperCase(),
        descricao: this.form.value.descricao.toUpperCase(),
        tipoContratacao: this.form.value.tipoContratacao.toUpperCase(),
        vinculo: this.form.value.vinculo.toUpperCase(),
        jornada_Inicio: this.form.value.jornada_Inicio,
        jornada_Fim: this.form.value.jornada_Fim,
        localizacao: this.form.value.localizacao.toUpperCase(),
        responsabilidades: this.form.value.responsabilidades.toUpperCase(),

        requisitos: {
          frameworks: this.form.value.frameworks.map((v: any, i: any) => v ? this.frameworks[i] : null).filter((v: any) => v !== null),
          linguagens: this.form.value.linguagens.map((v: any, i: any) => v ? this.linguagens[i] : null).filter((v: any) => v !== null),
          tecnologias: this.form.value.tecnologias.map((v: any, i: any) => v ? this.tecnologias[i] : null).filter((v: any) => v !== null),
          idiomas: this.form.value.idiomas.map((v: any, i: any) => v ? this.idiomas[i] : null).filter((v: any) => v !== null),
        },
        reqDesejaveis: this.form.value.reqDesejaveis.toUpperCase(),
        areaInteresse: this.form.value.areaInteresse.toUpperCase()
      },
      rastro: {
        uid: this.admId,
        email: this.admEmail,
        roles: {
          user: true,
          admin: true
        }
      }
    }

    this.service.addVaga(VAGA).then(() => {
      console.log('Vaga cadastrada com sucesso!')

      this.openModal(this.incluirVaga)


      this.form.reset({ localizacao: 'SÃO PAULO/SP', areaInteresse: '' })
    }, (error) => {
      console.log(error)
    })
  }

  editarVaga() {


    const VAGA: cadVaga = {
      dataAtualizacao: new Date,
      ativo: true,
      dados: {
        codigoControle: this.form.value.codigoControle,
        tituloVaga: this.form.value.tituloVaga.toUpperCase(),
        descricao: this.form.value.descricao.toUpperCase(),
        tipoContratacao: this.form.value.tipoContratacao.toUpperCase(),
        vinculo: this.form.value.vinculo.toUpperCase(),
        jornada_Inicio: this.form.value.jornada_Inicio,
        jornada_Fim: this.form.value.jornada_Fim,
        localizacao: this.form.value.localizacao.toUpperCase(),
        responsabilidades: this.form.value.responsabilidades.toUpperCase(),

        requisitos: {
          frameworks: this.form.value.frameworks.map((v: any, i: any) => v ? this.frameworks[i] : null).filter((v: any) => v !== null),
          linguagens: this.form.value.linguagens.map((v: any, i: any) => v ? this.linguagens[i] : null).filter((v: any) => v !== null),
          tecnologias: this.form.value.tecnologias.map((v: any, i: any) => v ? this.tecnologias[i] : null).filter((v: any) => v !== null),
          idiomas: this.form.value.idiomas.map((v: any, i: any) => v ? this.idiomas[i] : null).filter((v: any) => v !== null),
        },
        reqDesejaveis: this.form.value.reqDesejaveis.toUpperCase(),
        areaInteresse: this.form.value.areaInteresse.toUpperCase()
      },
      rastro: {
        uid: this.admId,
        email: this.admEmail,
        roles: {
          user: true,
          admin: true
        }
      }
    }
    this.service.editarVaga(this.id, VAGA).then(() => {
      console.log('Vaga atualizada com sucesso.');
      this.form.reset({ localizacao: 'SÃO PAULO/SP', areaInteresse: '' })

      //Modal de atualização de vaga
      this.openModal(this.atualizarVaga)

    }, (error) => {
      console.log(error)
    })
  }



  /////////////////////////////////////////////////////////
  // getControls e builds para os campos dinamicos
  getFrameworksControls() {
    return (this.form.get('frameworks') as FormArray).controls;
  }

  //função utilizada para a inicialização dos checkboxs do campo framework. a função percorre índice por índice do array e cria um checkbox para cada
  buildFrameworks() {
    // pra não fazer um new FormControl pra cada manualmente e garantir que seja dinamico, mapear o array
    const values = this.frameworks.map((v: any) => new FormControl(false))
    return this.fb.array(values)
  }

  // inicializando os checkbox com os valores corretos na edição
  buildEditFrameworks(resultado: any) {
    let valuesEditF: any[] = [];
    let valuesCheckF: any[] = [];
    this.frameworks.forEach(() => {
      valuesCheckF.push(false)
    })

    resultado.forEach((element: any) => {
      this.frameworks.forEach((pos: any, index: any) => {
        if (element == pos) {
          valuesEditF.push(index)
        }
      })
    });
    valuesEditF.forEach((test) => {
      valuesCheckF[test] = true
    })
    return valuesCheckF;
  }


  getLinguagensControls() {
    return (this.form.get('linguagens') as FormArray).controls;

  }

  buildLinguagens() {
    const values1 = this.linguagens.map((v: any) => new FormControl(false))
    return this.fb.array(values1)
  }

  // inicializando os checkbox com os valores corretos na edição
  buildEditLinguagens(resultado: any) {
    let valuesEditL: any[] = [];
    let valuesCheckL: any[] = [];
    this.linguagens.forEach(() => {
      valuesCheckL.push(false)
    })

    resultado.forEach((element: any) => {
      this.linguagens.forEach((pos: any, index: any) => {
        if (element == pos) {
          valuesEditL.push(index)
        }
      })
    });
    valuesEditL.forEach((test) => {
      valuesCheckL[test] = true
    })
    return valuesCheckL;
  }


  getTecnologiasControls() {
    return (this.form.get('tecnologias') as FormArray).controls;
  }

  buildTecnologias() {
    const values2 = this.tecnologias.map((v: any) => new FormControl(false))
    return this.fb.array(values2)
  }


  // inicializando os checkbox com os valores corretos na edição
  buildEditTecnologias(resultado: any) {
    let valuesEditT: any[] = [];
    let valuesCheckT: any[] = [];
    this.tecnologias.forEach(() => {
      valuesCheckT.push(false)
    })

    resultado.forEach((element: any) => {
      this.tecnologias.forEach((pos: any, index: any) => {
        if (element == pos) {
          valuesEditT.push(index)
        }
      })
    });
    valuesEditT.forEach((test) => {
      valuesCheckT[test] = true
    })
    return valuesCheckT;
  }

  getIdiomasControls() {
    return (this.form.get('idiomas') as FormArray).controls;
  }
  buildIdiomas() {
    const values3 = this.idiomas.map((v: any) => new FormControl(false))
    return this.fb.array(values3)
  }

  // inicializando os checkbox com os valores corretos na edição
  buildEditIdiomas(resultado: any) {
    let valuesEditI: any[] = [];
    let valuesCheckI: any[] = [];
    this.idiomas.forEach(() => {
      valuesCheckI.push(false)
    })

    resultado.forEach((element: any) => {
      this.idiomas.forEach((pos: any, index: any) => {
        if (element == pos) {
          valuesEditI.push(index)
        }
      })
    });
    valuesEditI.forEach((test) => {
      valuesCheckI[test] = true
    })
    return valuesCheckI;
  }
  /////////////////////////////////////////////////////////

}



