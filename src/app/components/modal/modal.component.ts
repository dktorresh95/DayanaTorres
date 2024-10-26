import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() buttonMessage: string = '';
  @Input() buttonMessageTwo: string = 'Cancelar';
  @Input() showConfirm: boolean = false;
  @Output() actionButton = new EventEmitter<void>();

  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  action() {
    this.actionButton.emit();
    this.close();
  }
}
