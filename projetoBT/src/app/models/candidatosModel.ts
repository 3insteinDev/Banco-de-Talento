export class Candidato {
  id?: string
  loginCandidato: string
  senhaCandidato: string
  nomeSocial: string
  nome: string
  sobrenome: string
  dataNascimento: string
  cpf: string
  rg: string
  // nacionalidade:string
  cep: string
  estadoCivil: string
  genero: string
  // linguagens: object
  formacaoNivel: string
  formacaoGrau: string
  formacaoStatus: string
  formacaoCurso: string
  formacaoInstituicao: string
  formacaoInicio: string
  formacaoFim: string
  experiencia: string
  experienciaEmpresa: string
  experienciaCargo: string
  experienciaInicio: string
  experienciaFim: string
  experienciaDescricao: string
  cursos: string
  conquistas: string
  certificados: string
  diversidade: string
  diversidadePronome: string
  diversidadeIdentidade: string
  diversidadeOrientacao: string
  diversidadeRaca: string
  perfilLinkedin: string
  portfolio: string
  areaInteresse: string
  areaAtuacao: string
  frameworks: object
  pretensaoSalarial: string

  dataCriacao?: Date
  dataAtualizacao?: Date
  ativo?: boolean


  constructor() {
    this.id = ''
    this.loginCandidato = ''
    this.senhaCandidato = ''
    this.nomeSocial = ''
    this.nome = ''
    this.sobrenome = ''
    this.dataNascimento = ''
    this.cpf = ''
    this.rg = ''
    // nacionalidade:string
    this.cep = ''
    this.estadoCivil = ''
    this.genero = ''
    // this.linguagens = {}
    this.formacaoNivel = ''
    this.formacaoGrau = ''
    this.formacaoStatus = ''
    this.formacaoCurso = ''
    this.formacaoInstituicao = ''
    this.formacaoInicio = ''
    this.formacaoFim = ''
    this.experiencia = ''
    this.experienciaEmpresa = ''
    this.experienciaCargo = ''
    this.experienciaInicio = ''
    this.experienciaFim = ''
    this.experienciaDescricao = ''
    this.cursos = ''
    this.conquistas = ''
    this.certificados = ''
    this.diversidade = ''
    this.diversidadePronome = ''
    this.diversidadeIdentidade = ''
    this.diversidadeOrientacao = ''
    this.diversidadeRaca = ''
    this.perfilLinkedin = ''
    this.portfolio = ''
    this.areaInteresse = ''
    this.areaAtuacao = ''
    this.frameworks = {}
    this.pretensaoSalarial = ''
    this.dataCriacao = new Date()
    this.dataAtualizacao = new Date()
    this.ativo = true
  }
}
