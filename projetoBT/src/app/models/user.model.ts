export interface User {
  uid: string
  email: string
  roles: Roles
  curriculoAtivo: boolean
  cadastroAtivo: boolean
  selecionado: boolean
  dataCriacao?: Date
  dataAtualizacao?: Date
  curriculo?: Curriculo
  vagas: object
}

export interface Vaga {
  uid: string
  codigoControle: string
  tituloVaga: string
  situacao: string
}

export interface Roles {
  user: boolean
  admin: boolean
  superAdmin?: boolean
}

export interface Curriculo {

  dados: DadosPessoais
  contato: Contato
  objetivos: Objetivos
  formacao: Formacao
  experiencia: Experiencia
  competencia: Competencia
  diversidade: Diversidade
  plus: Plus
}

export interface DadosPessoais {
  nome: string
  sobrenome: string
  nomeSocial: string
  dataNascimento: string
  cpf: string
  nacionalidade: string
  estadoCivil: string
  cep: string
}

export interface Contato {
  telefone: string
  linkedin: string
  portfolio: string
}

export interface Objetivos {
  areaInteresse: string
  areaAtuacao: string
  pretensao: string
  indicacao: string

}

export interface Formacao {
  nivel: string
  grau: string
  status: string
  curso: string
  instituicao: string
  inicio: string
  fim: string
}

export interface Experiencia {
  experiencia: string
  empresa: string
  cargo: string
  inicio: string
  fim: string
  descricao: string
}

export interface Competencia {
  frameworks: object
  linguagens: object
  tecnologias: object
  idiomas: object
}

export interface Diversidade {
  deficiencia: string
  pronome: string
  genero: string
  orientacao: string
  raca: string
}

export interface Plus {
  cursos: string
  conquistas: string
  certificados: string

}
