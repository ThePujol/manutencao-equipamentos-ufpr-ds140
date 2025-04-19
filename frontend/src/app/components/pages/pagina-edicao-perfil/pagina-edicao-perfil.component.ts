import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ViaCepService } from '../../../services/via-cep.service';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SidebarClienteComponent,
    RouterOutlet
  ],
  templateUrl: './pagina-edicao-perfil.component.html',
})
export class PaginaEdicaoPerfilComponent {
  private fb = inject(FormBuilder);
  private viaCepService = inject(ViaCepService);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', Validators.required],
    tel: ['', Validators.required],
    cep: ['', Validators.required],
    estado: ['', Validators.required],
    cidade: ['', Validators.required],
    endereco: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['']
  });

  imagem: string | null = null;
  cepInvalido = false;

  ngOnInit(): void {

    this.form.patchValue({
      nome:'Davi Brito',
      email: 'davi.brito@email.com',
      cpf: '123.456.789-00',
      tel:'(11) 91234-5678',
      cep: '47400-000',
      estado: 'BA',
      cidade: 'Xique-Xique',
      endereco: 'Rua Coronel Manoel Teixeira',
      numero: '91',
      complemento: 'Apto 02'
    })
    this.form.get('cep')?.valueChanges.subscribe((cep: string | null) => {
      this.cepInvalido = false;

      if (!cep) return;

      const cleanedCep = cep.replace(/\D/g, '');

      if (cleanedCep.length === 8) {
        this.viaCepService.buscar(cleanedCep).subscribe({
          next: (data) => {
            if (!data.erro) {
              this.form.patchValue({
                endereco: data.logradouro,
                cidade: data.localidade,
                estado: data.uf,
                complemento: data.complemento
              });
              this.form.get('cep')?.setErrors(null);
            } else {
              this.cepInvalido = true;
              this.form.get('cep')?.setErrors({ cepInvalido: true });
            }
          },
          error: () => {
            this.cepInvalido = true;
            this.form.get('cep')?.setErrors({ cepInvalido: true });
          }
        });
      }
    });
  }

  cepNaoEncontrado(): boolean {
    return this.cepInvalido;
  }

  imagemSelecionada(): string | null {
    return this.imagem;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagem = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = this.form.value;
    console.log('Dados salvos:', dados);
  }
}
