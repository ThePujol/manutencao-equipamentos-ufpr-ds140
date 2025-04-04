import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  imports: [],
  templateUrl: './mensagem.component.html',
})
export class MensagemComponent {
  
  email: string = '';
  senha: string = '';
  mensagemErro: string = '';

  validarLogin() {
    if (this.email !== 'usuario@exemplo.com') {
      this.mensagemErro = 'O email informado está incorreto, ou não cadastrado. Por favor digite novamente.';
    } else if (this.senha !== '123456') {
      this.mensagemErro = 'A senha digitada está incorreta, por tente novamente.';
    } else {
      this.mensagemErro = '';
      alert('Login realizado com sucesso!');
    }
  }
 
}
