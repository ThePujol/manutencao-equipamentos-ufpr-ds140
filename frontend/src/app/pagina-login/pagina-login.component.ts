import { Component } from '@angular/core';
import { MensagemComponent } from '../mensagem/mensagem.component';
import {
  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pagina-login',
  imports: [MensagemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './pagina-login.component.html'
})
export class PaginaLoginComponent {
  submitted = false;
  mensagemErro!: string;
  exibirErro = false;
  loginForm!: FormGroup;

  constructor(private fBuilder: FormBuilder) {
    this.loginForm = this.fBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.mensagemErro = '';
      this.exibirErro = false;
      this.submitted = true;
      this.loginForm.reset();
    } else {
      //this.exibirErro = true;
      //this.mensagemErro = "Erro no login.";
      console.log(this.loginForm.value)
      console.log("erro no formulario")
    }
  }

}
