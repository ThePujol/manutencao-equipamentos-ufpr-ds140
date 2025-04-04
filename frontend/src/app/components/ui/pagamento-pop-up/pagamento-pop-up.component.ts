import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pagamento-pop-up',
  imports: [],
  templateUrl: './pagamento-pop-up.component.html',
})
export class PagamentoPopUpComponent {
  pagMeio = 'Cartão de Crédito';

  constructor(private dialogRef: MatDialogRef<PagamentoPopUpComponent>) {}

  close() {
    this.dialogRef.close();
  }

  finalizarPgto() {
    console.log('Pagamento finalizado:', this.pagMeio);
    this.dialogRef.close();
  }

  atualizaPgto(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.pagMeio = target.value;
  }

}
