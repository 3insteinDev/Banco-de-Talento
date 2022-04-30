import { Objetivos } from './../../../models/user.model';
import { CurriculosService } from './../../../services/curriculos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CpfValidator } from 'src/app/validations/validacoes';
import { User } from 'src/app/models/user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-curriculo',
  templateUrl: './form-curriculo.component.html',
  styleUrls: ['./form-curriculo.component.css']
})



export class FormCurriculoComponent implements OnInit {


  //-----------------------------Início ProgressBar-------------------------------//
  preenchido: number = 0
  total: number = 100

  nome: number = 0 //ok
  sobrenome: number = 0 //ok
  dataNascimento: number = 0 //ok
  cpf: number = 0 //ok
  cep: number = 0 //ok
  telefone: number = 0 //ok
  areaInteresse: number = 0 //ok
  pretensaoSalarial: number = 0 //ok
  formacaoNivel: number = 0 //ok
  formacaoGrau: number = 0 // ok
  formacaoStatus: number = 0 // ok
  formacaoCurso: number = 0 //ok
  formacaoInstituicao: number = 0
  formacaoInicio: number = 0
  formacaoFim: number = 0
  diversidade: number = 0
  diversidadePronome: number = 0
  diversidadeIdentidade: number = 0
  diversidadeOrientacao: number = 0
  diversidadeRaca: number = 0

  barraProgresso(nome: string) {
    if (this.form.get('nome')?.valid) {
      this.nome = 5
      console.log('Nome: ' + this.nome)
    } else {
      this.nome = 0
    }

    if (this.form.get('sobrenome')?.valid) {
      this.sobrenome = 5
      console.log('SobreNome: ' + this.sobrenome)
    } else {
      this.sobrenome = 0
    }

    if (this.form.get('dataNascimento')?.valid) {
      this.dataNascimento = 5
      console.log('Data de Nascimento : ' + this.dataNascimento)
    } else {
      this.dataNascimento = 0
    }

    if (this.form.get('cpf')?.valid) {
      this.cpf = 5
      console.log('CPF : ' + this.cpf)
    } else {
      this.cpf = 0
    }

    if (this.form.get('cep')?.valid) {
      this.cep = 5
      console.log('CEP : ' + this.cep)
    } else {
      this.cep = 0
    }

    if (this.form.get('telefone')?.valid) {
      this.telefone = 5
      console.log('Telefone : ' + this.telefone)
    } else {
      this.telefone = 0
    }

    if (this.form.get('areaInteresse')?.valid) {
      this.areaInteresse = 5
      console.log('Area de Interesse : ' + this.areaInteresse)
    } else {
      this.areaInteresse = 0
    }

    if (this.form.get('pretensaoSalarial')?.valid) {
      this.pretensaoSalarial = 5
      console.log('Pretensão Salarial : ' + this.pretensaoSalarial)
    } else {
      this.pretensaoSalarial = 0
    }

    if (this.form.get('formacaoNivel')?.valid) {
      this.formacaoNivel = 5
      console.log('Formação Nível : ' + this.formacaoNivel)
    } else {
      this.formacaoNivel = 0
    }

    if (this.form.get('formacaoGrau')?.valid) {
      this.formacaoGrau = 5
      console.log('Formação Grau : ' + this.formacaoGrau)
    } else {
      this.formacaoGrau = 0
    }

    if (this.form.get('formacaoStatus')?.valid) {
      this.formacaoStatus = 5
      console.log('Formação Status : ' + this.formacaoStatus)
    } else {
      this.formacaoStatus = 0
    }

    if (this.form.get('formacaoCurso')?.valid) {
      this.formacaoCurso = 5
      console.log('Formação Curso : ' + this.formacaoCurso)
    } else {
      this.formacaoCurso = 0
    }

    if (this.form.get('formacaoInstituicao')?.valid) {
      this.formacaoInstituicao = 5
      console.log('Formação Instituição : ' + this.formacaoInstituicao)
    } else {
      this.formacaoInstituicao = 0
    }

    if (this.form.get('formacaoInicio')?.valid) {
      this.formacaoInicio = 5
      console.log('Formação Início : ' + this.formacaoInicio)
    } else {
      this.formacaoInicio = 0
    }

    if (this.form.get('formacaoFim')?.valid) {
      this.formacaoFim = 5
      console.log('Formação Fim : ' + this.formacaoFim)
    } else {
      this.formacaoFim = 0
    }

    if (this.form.get('diversidade')?.valid) {
      this.diversidade = 5
      console.log('Diversidade : ' + this.diversidade)
    } else {
      this.diversidade = 0
    }

    if (this.form.get('diversidadePronome')?.valid) {
      this.diversidadePronome = 5
      console.log('Diversidade Pronome : ' + this.diversidadePronome)
    } else {
      this.diversidadePronome = 0
    }

    if (this.form.get('diversidadeIdentidade')?.valid) {
      this.diversidadeIdentidade = 5
      console.log('Diversidade Identidade : ' + this.diversidadeIdentidade)
    } else {
      this.diversidadeIdentidade = 0
    }

    if (this.form.get('diversidadeOrientacao')?.valid) {
      this.diversidadeOrientacao = 5
      console.log('Diversidade Orientação : ' + this.diversidadeOrientacao)
    } else {
      this.diversidadeOrientacao = 0
    }

    if (this.form.get('diversidadeRaca')?.valid) {
      this.diversidadeRaca = 5
      console.log('Diversidade Raça : ' + this.diversidadeRaca)
    } else {
      this.diversidadeRaca = 0
    }


    this.preenchido = (
      this.nome
      + this.sobrenome
      + this.dataNascimento
      + this.cpf
      + this.cep
      + this.telefone
      + this.areaInteresse
      + this.pretensaoSalarial
      + this.formacaoNivel
      + this.formacaoGrau
      + this.formacaoStatus
      + this.formacaoCurso
      + this.formacaoInstituicao
      + this.formacaoInicio
      + this.formacaoFim
      + this.diversidade
      + this.diversidadePronome
      + this.diversidadeIdentidade
      + this.diversidadeOrientacao
      + this.diversidadeRaca)
    console.log('Preenchido: ' + this.preenchido)
  }



  //-----------------------------Fim ProgressBar-------------------------------//


  // Inicio Modal
  modalRef?: BsModalRef;
  //Variável para trocar a mensagem do Modal ao editar curriculo
  msgModal: string = ''
  // Fim Modal

  form: FormGroup
  curriculo: any
  id: any
  role: string = ''
  curriculoAtivo: boolean = false
  dataCriacao: Date = new Date
  cadastroAtivo: boolean = true
  email: string = ''
  vagas: object = {}

  valorRadioExperiencia: boolean = true

  // Inicializando os valores de array que serão mostrados nas opções de cadastro de vagas
  frameworks = ['ANGULAR', 'ASP.NET', 'DJANGO', 'DRUPAL', 'EXPRESS', 'FLASK', 'GATSBY', 'JQUERY', 'LARAVEL', 'REACT.JS', 'RUBY ON RAILS', 'SPRING', 'SYMFONY', 'VUE.JS']
  linguagens = ['ASSEMBLY', 'C/C++', 'C#', 'CSS3', 'DART', 'GO', 'HTML5', 'JAVA', 'JAVASCRIPT', 'JULIA', 'KOTLIN', 'OBJECTIVE-C', 'PERL', 'PHP', 'PYTHON', 'R', 'RUBY', 'RUST', 'SQL', 'SWIFT', 'TYPESCRIPT', 'VBA']
  tecnologias = ['ANDROID', 'AWS', 'CASSANDRA', 'DOCKER', 'DYNAMODB', 'ELASTICSEARCH', 'FIREBASE', 'GOOGLE CLOUD PLATAFORM', 'HEROKU', 'IOS', 'KUBERNETES', 'LINUX', 'MACOS', 'MICROSOFT SQL SERVER', 'MONGODB', 'MYSQL', 'NODEJS', 'ORACLE', 'POSTGRESQL', 'SQLITE']
  idiomas = ['ALEMÃO', 'ÁRABE', 'ESPANHOL', 'FRANCÊS', 'INGLÊS', 'JAPONÊS', 'MANDARIM']

  @ViewChild('incluirCurriculo') incluirCurriculo: any

  constructor(private fb: FormBuilder, private curriculosService: CurriculosService, private afAuth: AngularFireAuth,
    private router: Router, private modalService: BsModalService) {
    // pega o uid do usuário atual
    this.afAuth.currentUser.then(data => {
      console.log(data?.uid);
      this.id = data?.uid
    }, (error) => {
      console.log(error);
    })


    // aqui inicializa os componentes
    this.form = this.fb.group({
      /////dados de login
      email: [this.email],
      roles: [this.role],
      /////// dados pessoais
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^\S*$/)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3)]],
      nomeSocial: [''],
      dataNascimento: ['', [Validators.required]],
      cpf: ['', ([Validators.required, CpfValidator.cpfValido])],
      nacionalidade: [''],
      estadoCivil: [''],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      //////dados de contato
      telefone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(11)]],
      perfilLinkedin: [''],
      portfolio: [''],
      // //////////objetivos
      areaInteresse: ['', [Validators.required]],
      areaAtuacao: ['', [Validators.required]],
      pretensaoSalarial: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      indicacao: [''],
      // ////////// formação
      formacaoNivel: ['', [Validators.required]],
      formacaoGrau: ['', [Validators.required]],
      formacaoStatus: ['', [Validators.required]],
      formacaoCurso: ['', [Validators.required]],
      formacaoInstituicao: ['', [Validators.required]],
      formacaoInicio: ['', [Validators.required]],
      formacaoFim: ['', [Validators.required]],
      // ////// experiência
      experiencia: [''],
      experienciaEmpresa: [''],
      experienciaCargo: [''],
      experienciaInicio: [''],
      experienciaFim: [''],
      experienciaDescricao: [''],
      // //////competencias
      frameworks: this.buildFrameworks(),
      linguagens: this.buildLinguagens(),
      tecnologias: this.buildTecnologias(),
      idiomas: this.buildIdiomas(),
      // ////// diversidade
      diversidade: ['', [Validators.required]],
      diversidadePronome: ['', [Validators.required]],
      diversidadeIdentidade: ['', [Validators.required]],
      diversidadeOrientacao: ['', [Validators.required]],
      diversidadeRaca: ['', [Validators.required]],
      // plus
      cursos: [''],
      conquistas: [''],
      certificados: [''],

    })
  }

  ////// pegar o valor do radio da experiencia
  valorExperiencia() {
    console.log('experiencia ===> ', this.form.value.experiencia);
    if (this.form.value.experiencia == 'SIM') {
      this.valorRadioExperiencia = false
    } else {
      this.valorRadioExperiencia = true
    }

  }

  // Função para Abrir modal de confirmação de registro incluído
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' })
  }

  // Botão Fechar da Modal, depois de inserir uma vaga
  confirm(): void {
    this.modalRef?.hide();
  }


  // inicializando a página para exibir os dados do usuário
  ngOnInit(): void {



    this.curriculosService.getUmCandidato(this.id).subscribe({
      next: doc => {
        console.log(doc)
        this.curriculo = doc
        // pra usar com o formControl
        this.preencheForm(this.curriculo)
      },
      error: erro => console.error(erro),
      complete: () => console.info('Complete')
    })
  }




  //pra usar o updateForm tem que ser com o formControlName
  preencheForm(campo: any) {

    // pega o valor do cadastroAtivo
    this.cadastroAtivo = campo.cadastroAtivo

    // pegando o valor das vagas
    this.vagas = campo.vagas

    // pegando o valor da data
    this.dataCriacao = campo.dataCriacao

    // pegando o valor do email
    this.email = campo.email

    // definindo a mensagem de cadastro de curriculo, se a pessoa não tiver, aparece
    this.curriculoAtivo = campo.curriculoAtivo

    // definindo o tipo de usuário
    if (campo.roles.admin) {
      this.role = 'admin'
    } else { this.role = 'user' }
    console.log(this.role);

    // para que os campos sejam inicializados
    if (this.curriculoAtivo == false) {

      //Criando curriculo
      this.msgModal = 'Curriculo cadastrado com sucesso !'

      // pegando os dados do firebase e preenchendo no form
      this.form.patchValue({
        email: campo.email,
        roles: this.role,
      })

    } else {
      //Editando curriculo
      this.msgModal = 'Curriculo editado com sucesso !'
      if (campo.curriculo.experiencia.experiencia == 'NÃO') {
        this.valorRadioExperiencia = false
      }

      // pegando os dados do firebase e preenchendo no form
      this.form.patchValue({
        email: campo.email,
        roles: this.role,

        /////// dados pessoais
        nome: campo.curriculo.dados.nome,
        sobrenome: campo.curriculo.dados.sobrenome,
        nomeSocial: campo.curriculo.dados.nomeSocial,
        dataNascimento: campo.curriculo.dados.dataNascimento,
        cpf: campo.curriculo.dados.cpf,
        nacionalidade: campo.curriculo.dados.nacionalidade,
        estadoCivil: campo.curriculo.dados.estadoCivil.toLowerCase(),
        cep: campo.curriculo.dados.cep,
        //////dados de contato
        telefone: campo.curriculo.contato.telefone,
        perfilLinkedin: campo.curriculo.contato.linkedin,
        portfolio: campo.curriculo.contato.portfolio,
        // //////////objetivos
        areaInteresse: campo.curriculo.objetivos.areaInteresse.toLowerCase(),
        areaAtuacao: campo.curriculo.objetivos.areaAtuacao,
        pretensaoSalarial: campo.curriculo.objetivos.pretensao,
        indicacao: campo.curriculo.objetivos.indicacao,
        // ////////// formação
        formacaoNivel: campo.curriculo.formacao.nivel.toLowerCase(),
        formacaoGrau: campo.curriculo.formacao.grau.toLowerCase(),
        formacaoStatus: campo.curriculo.formacao.status.toLowerCase(),
        formacaoCurso: campo.curriculo.formacao.curso,
        formacaoInstituicao: campo.curriculo.formacao.instituicao,
        formacaoInicio: campo.curriculo.formacao.inicio,
        formacaoFim: campo.curriculo.formacao.fim,
        // ////// experiência
        experiencia: campo.curriculo.experiencia.experiencia,
        experienciaEmpresa: campo.curriculo.experiencia.empresa,
        experienciaCargo: campo.curriculo.experiencia.cargo,
        experienciaInicio: campo.curriculo.experiencia.inicio,
        experienciaFim: campo.curriculo.experiencia.fim,
        experienciaDescricao: campo.curriculo.experiencia.descricao,
        // //////competencias
        frameworks: this.buildEditFrameworks(campo.curriculo.competencia.frameworks),
        linguagens: this.buildEditLinguagens(campo.curriculo.competencia.linguagens),
        tecnologias: this.buildEditTecnologias(campo.curriculo.competencia.tecnologias),
        idiomas: this.buildEditIdiomas(campo.curriculo.competencia.idiomas),
        // ////// diversidade
        diversidade: campo.curriculo.diversidade.deficiencia,
        diversidadePronome: campo.curriculo.diversidade.pronome,
        diversidadeIdentidade: campo.curriculo.diversidade.genero,
        diversidadeOrientacao: campo.curriculo.diversidade.orientacao,
        diversidadeRaca: campo.curriculo.diversidade.raca,
        // plus
        cursos: campo.curriculo.plus.cursos,
        conquistas: campo.curriculo.plus.conquistas,
        certificados: campo.curriculo.plus.certificados,


      })

    }



  }



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
    const values = this.linguagens.map((v: any) => new FormControl(false))
    return this.fb.array(values)
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
    const values = this.tecnologias.map((v: any) => new FormControl(false))
    return this.fb.array(values)
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
    const values = this.idiomas.map((v: any) => new FormControl(false))
    return this.fb.array(values)
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







  saveCurriculo() {
    const USER: User = {
      uid: this.id,
      email: this.email,
      roles: {
        admin: false,
        user: true
      },
      curriculoAtivo: true,
      cadastroAtivo: true,
      selecionado: false,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: new Date,
      curriculo: {
        dados: {
          nome: this.form.value.nome.toUpperCase(),
          sobrenome: this.form.value.sobrenome.toUpperCase(),
          nomeSocial: this.form.value.nomeSocial.toUpperCase(),
          dataNascimento: this.form.value.dataNascimento,
          cpf: this.form.value.cpf,
          nacionalidade: this.form.value.nacionalidade.toUpperCase(),
          estadoCivil: this.form.value.estadoCivil.toUpperCase(),
          cep: this.form.value.cep,
        },
        contato: {
          telefone: this.form.value.telefone,
          linkedin: this.form.value.perfilLinkedin.toUpperCase(),
          portfolio: this.form.value.portfolio.toUpperCase(),
        },
        objetivos: {
          areaInteresse: this.form.value.areaInteresse.toUpperCase(),
          areaAtuacao: this.form.value.areaAtuacao.toUpperCase(),
          pretensao: this.form.value.pretensaoSalarial,
          indicacao: this.form.value.indicacao.toUpperCase(),
        },
        formacao: {
          nivel: this.form.value.formacaoNivel.toUpperCase(),
          grau: this.form.value.formacaoGrau.toUpperCase(),
          status: this.form.value.formacaoStatus.toUpperCase(),
          curso: this.form.value.formacaoCurso.toUpperCase(),
          instituicao: this.form.value.formacaoInstituicao.toUpperCase(),
          inicio: this.form.value.formacaoInicio,
          fim: this.form.value.formacaoFim,
        },
        experiencia: {
          experiencia: this.form.value.experiencia.toUpperCase(),
          empresa: this.form.value.experienciaEmpresa.toUpperCase(),
          cargo: this.form.value.experienciaCargo.toUpperCase(),
          inicio: this.form.value.experienciaInicio,
          fim: this.form.value.experienciaFim,
          descricao: this.form.value.experienciaDescricao.toUpperCase(),

        },
        competencia: {
          frameworks: this.form.value.frameworks.map((v: any, i: any) => v ? this.frameworks[i] : null).filter((v: any) => v !== null),
          linguagens: this.form.value.linguagens.map((v: any, i: any) => v ? this.linguagens[i] : null).filter((v: any) => v !== null),
          tecnologias: this.form.value.tecnologias.map((v: any, i: any) => v ? this.tecnologias[i] : null).filter((v: any) => v !== null),
          idiomas: this.form.value.idiomas.map((v: any, i: any) => v ? this.idiomas[i] : null).filter((v: any) => v !== null),
        },
        diversidade: {
          deficiencia: this.form.value.diversidade.toUpperCase(),
          pronome: this.form.value.diversidadePronome.toUpperCase(),
          genero: this.form.value.diversidadeIdentidade.toUpperCase(),
          orientacao: this.form.value.diversidadeOrientacao.toUpperCase(),
          raca: this.form.value.diversidadeRaca.toUpperCase(),
        },
        plus: {
          cursos: this.form.value.cursos.toUpperCase(),
          conquistas: this.form.value.conquistas.toUpperCase(),
          certificados: this.form.value.certificados.toUpperCase()
        },
      },
      vagas: this.vagas
    }
    this.curriculosService.addCurriculo(USER).then(() => {
      this.router.navigate(['/user/view'])
      this.form.reset({ estadoCivil: '' })
      //Chama função para exibir Modal
      this.openModal(this.incluirCurriculo)

    }, (error) => {
      console.log(error);
    })
  }



}




