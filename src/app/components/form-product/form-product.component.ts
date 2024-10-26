import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageResponse, ResponseData } from 'src/app/models/response.model';
import { ModalComponent } from '../modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

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
  isEdit: boolean = false;
  product: Product = {};
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'] || undefined;
      if (id) {
        this.getById(id?.toString());
      }
    });
    this.initForm();
  }

  addProduct() {
    this.spinner.show();
    this.productService.addProducts(this.formGroup.value).subscribe({
      next: (res: MessageResponse) => {
        this.showModalInfo(res.message, 'Información')
        this.spinner.hide();
        this.initForm();
      },
      error: err => {
        this.showModalInfo(err.message, 'Error')

      }
    }

    )
  }

  /**
   * Inits form
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.product.id ? this.product.id : '', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [this.product.name ? this.product.name : '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [this.product.description ? this.product.description : '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [this.product.logo ? this.product.logo : '', Validators.required],
      date_revision: [this.product.date_revision ? this.product.date_revision : '', [Validators.required, this.validateDate.bind(this)]],
      date_release: [this.product.date_release ? this.product.date_release : '', [Validators.required, this.validateDate.bind(this)]],
    });
    if (this.isEdit) {
      this.formGroup.get('id')?.disable();
    }
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

  showModalInfo(message: string | undefined, type: string) {
    this.message = message ? message : '';
    this.buttonMessageTwo = 'Aceptar';
    this.titleModal = type;
    this.showConfirm = false;
    this.modal.open();
  }

  /**
   * get product by id
   * @param id 
   */
  getById(id: string) {
    this.productService.getproductsById(id).subscribe({
      next: (res: any) => {
        if (res) {
          this.product = res;
          this.isEdit = true;
          this.initForm();
        }
      },
      error: err => {
        this.showModalInfo(err.message, 'Error')
      }
    }
    )
  }

  /**
   * update Product
   */
  updateProduct() {
    this.productService.updateProduct(this.formGroup.value, this.formGroup.get('id')?.value).subscribe({
      next: (res: MessageResponse) => {
        this.showModalInfo(res.message, 'Información')
        this.spinner.hide();
      },
      error: err => {
        this.showModalInfo(err.message, 'Error')
      }
    })
  }

  /**
   * Validate existence of id viwth blur event
   */
  validateExistence() {
    if (this.formGroup.get('id')?.value && !this.hasErrorMinLength('id') && !this.hasErrorMaxLength('id')) {
      this.productService.validateExistence(this.formGroup.get('id')?.value).subscribe( {
        next: (res) => {
          if (res) {
            this.formGroup.get('id')?.setErrors({exist: true});
          }
        }, 
        error: err => {
          this.showModalInfo(err.message, 'Error')
        }
      })
    }
  }
}
