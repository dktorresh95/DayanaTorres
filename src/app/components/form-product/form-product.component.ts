import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageResponse } from 'src/app/models/response.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;

  formGroup: FormGroup = new FormGroup({});
  titleModal: string = '';
  message: string = '';
  buttonMessage: string = '';
  buttonMessageTwo: string = '';
  id: string = '';
  showConfirm: boolean = false;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.initForm();
  }

  addProduct() {
    this.spinner.show();
    this.productService.addProducts(this.formGroup.value).subscribe(
      (res: MessageResponse) => {
        this.showModalInfo(res.message, 'Información')
        this.spinner.hide();
        this.initForm();
      }
    )
  }

  /**
   * Inits form
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      id: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_revision: ['', [Validators.required, this.validateDate.bind(this)]],
      date_release: ['', [Validators.required, this.validateDate.bind(this)]],
    });

  }

  hasErrorMinLength(label: string) {
    return this.formGroup.get(label)?.hasError('minlength');
  }
  hasErrorMaxLength(label: string) {
    return this.formGroup.get(label)?.hasError('maxlength');
  }
  isRequired(label: string) {
    return this.formGroup.get(label)?.hasError('required') && this.formGroup.get(label)?.touched;
  }

  isValidDate(label: string) {
    return this.formGroup.get(label)?.errors?.['invalidDate'];
  }
  /**
   * 
   * @param dateSelected in calendar
   * @returns if date is major than current value
   */
  validateDate(dateSelected: any) {
    const currentDate = new Date();
    const dateInput = new Date(dateSelected.value);
    return dateInput > currentDate ? null : { invalidDate: true };
  }

  showModalInfo (message: string | undefined, type: string) {
    this.message = message ? message : '';
    this.buttonMessageTwo = 'Aceptar';
    this.titleModal = type;
    this.showConfirm = false;
    this.modal.open();
  }
}
