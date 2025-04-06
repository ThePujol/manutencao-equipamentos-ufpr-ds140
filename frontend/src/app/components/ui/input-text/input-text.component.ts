import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder:string = '';
  @Input() controlName: string = '';
  @Input() required: boolean = false;
  @Input() mask: string = '';
  formControl!: FormControl;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(){
    this.formControl = this.formGroupDirective.form.get(this.controlName) as FormControl;
  }

  getErr(): string {
    if(!this.formControl) return '';
    if(this.formControl.hasError('required')) return 'Campo obrigatório';
    if(this.formControl.hasError('email')) return 'E-mail inválido';
    if(this.formControl.hasError('minlength')) return `Mínimo de ${this.formControl.getError('minlength').requiredLength} caracteres.`;
    if(this.formControl.hasError('maxlength')) return `Máximo de ${this.formControl.getError('maxlength').requiredLength} caracteres.`;
    if(this.formControl.hasError('pattern')) return 'Formato inválido';
    return '';
  }
}
