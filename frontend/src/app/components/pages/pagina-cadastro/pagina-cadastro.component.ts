import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';

import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagina-cadastro',
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, RouterOutlet, RouterLink],
  templateUrl: './pagina-cadastro.component.html'
})
export class PaginaCadastroComponent {
  title ="Cadastro de Usuário";
  submitted = false;

  cadastroForm!: FormGroup;

  constructor(private fBuilder: FormBuilder){
    this.cadastroForm = this.fBuilder.group({
      nome: ['', Validators.required],
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

  ngOnInit(): void {}

  onSubmit() {
    if(this.cadastroForm.valid){
      console.log(this.cadastroForm.value);
      this.submitted = true;
      this.cadastroForm.reset();
    } else {
      console.log("Formulário inválido");
    }
  }
}
