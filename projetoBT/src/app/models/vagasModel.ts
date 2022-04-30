import { Competencia, Roles } from './user.model';
export interface cadVaga {
  uid?: string
  dataCriacao?: Date //Usado na função edit, para não precisar inserir a data de criação da vaga novamente
  dataAtualizacao: Date
  dataTermino?: Date //Usado na função edit, para não precisar inserir a data de criação da vaga novamente
  ativo: boolean //true ou false - Será colocado direto no código
  dados: Dados
  rastro: Rastro
}

export interface Dados {
  codigoControle: number
  tituloVaga: string
  descricao: string
  tipoContratacao: string
  vinculo: string
  jornada_Inicio: string
  jornada_Fim: string
  localizacao: string
  responsabilidades: string
  requisitos: Competencia //Foi importado a interface
  reqDesejaveis: string
  areaInteresse: string
}



//Estes dados serão preenchidos automaticamente
//Serão usados os dados de cadastro das vagas
export interface Rastro {
  uid: string | undefined
  email: string
  roles: Roles
}
