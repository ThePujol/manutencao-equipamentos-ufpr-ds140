import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';

import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { ViaCepService } from '../../../services/via-cep.service';

@Component({
  selector: 'app-pagina-cadastro',
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, RouterOutlet, RouterLink],
  templateUrl: './pagina-cadastro.component.html'
})
export class PaginaCadastroComponent {
  title ="Cadastro de Usuário";
  submitted = false;

  cadastroForm!: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private router: Router,
    private viaCepService: ViaCepService
  ) {
    // Inicializa o formulário
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
      complemento: ['']
    });

    this.cadastroForm.get('cep')?.valueChanges.subscribe((cep: string | null) => {
      if (!cep) return;

      const cleanedCep = cep.replace(/\D/g, '');

      if (cleanedCep.length === 8) {
        this.viaCepService.buscar(cleanedCep).subscribe({
          next: (data) => {
            if (!data.erro) {
              this.cadastroForm.patchValue({
                endereco: data.logradouro,
                cidade: data.localidade,
                estado: data.uf,
                complemento: data.complemento
              });
            } else {
              console.warn('CEP não encontrado');
            }
          },
          error: (err) => {
            console.error('Erro ao buscar CEP:', err);
          }
        });
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if(this.cadastroForm.valid){
      console.log(this.cadastroForm.value);
      this.submitted = true;
      this.cadastroForm.reset();
      this.router.navigate(['/login']);
    } else {
      console.log("Formulário inválido");
    }
  }
}
