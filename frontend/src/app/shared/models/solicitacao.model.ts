import { Categoria } from "./categoria.model";

export enum Situacao {
  aberta = "Aberta",
  orcada = "Orçada",
  rejeitada = "Rejeitada",
  redirecionada = "Redirecionada",
  aprovada = "Aprovada",
  arrumada = "Arrumada",
  paga = "Paga",
  finalizada = "Finalizada"
}
export class Solicitacao {
  constructor(
    public id: number,
    public descricao: string,
    public categoria: Categoria,
    public defeito: string,
    public orcamento: number,
    public situacao: Situacao
  ) {

  }
}

