import { Component,Input } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input() type: string = 'text';
  @Input() placeholder:string = '';
  @Input() controlName: string = '';
  @Input() label?: string;
  @Input() formControl!: FormControl;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(){
    this.formControl = this.formGroupDirective.form.get(this.controlName) as FormControl;
  }

  getErr(): string {
    if(!this.formControl) return '';
    if(this.formControl.hasError('required')) return 'Campo obrigatório';
    if(this.formControl.hasError('email')) return 'E-mail inválido';

    return '';
  }
}
