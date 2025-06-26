export class Pessoa {
	constructor(
		public id: number,
		public email: string,
		public senha: string,
		public nome: string,
		public cpf: string,
		public tel: string,
		public cep: string,
		public estado: string,
		public cidade: string,
		public endereco: string,
		public num: string,
		public complemento?: string
	) {}
}
