import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,  ReactiveFormsModule} from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';



@Component({
  selector: 'app-pagina-cadastro',
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent],
  templateUrl: './pagina-cadastro.component.html'
})
export class PaginaCadastroComponent {
  title ="Cadastro de Usuário";

  registerForm!: FormGroup;

  constructor(private fBuilder: FormBuilder) {}

  ngOnInit(){
    this.registerForm = this.fBuilder.group({
      nomeC: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      tel: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
  });
  }

  onSubmit() {
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
    console.log("O cadastro esta consistente")
  }
}
